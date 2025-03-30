import type { User } from '~/entities/user.model'
import type { ReceiveMessage } from '~/modules/app/entities/message'

import { io } from 'socket.io-client'

interface SocketProvider {
  send: (roomId: string, message: string) => void
  listenMessage: (callback: (data: ReceiveMessage) => void) => void
  disconnect: () => void
  isConnected: Ref<boolean>
}

export const socketKey = Symbol('socket') as InjectionKey<SocketProvider>

interface UseSocketOptions {
  user?: Ref<User | undefined>
}

export function useSocket({ user }: UseSocketOptions) {
  const { accessToken } = useAuth()
  const toast = useToast()
  const isConnected = ref(false)
  const socket = ref(io(useRuntimeConfig().public.apiUrl, {
    auth: { token: accessToken },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  }))

  socket.value.on('connect', () => {
    isConnected.value = true
  })

  socket.value.on('disconnect', () => {
    isConnected.value = false
  })

  socket.value.on('connect_error', (error) => {
    toast.add({
      title: 'Conexão falhou',
      description: error.message,
      color: 'error',
    })
    isConnected.value = false
  })

  function send(roomId: string, message: string) {
    if (!user?.value)
      return

    const messageData = {
      roomId,
      message,
      ownerId: user.value.id,
    }

    return new Promise((resolve, reject) => {
      socket.value.emit('message', messageData, (response: any) => {
        if (response.error)
          reject(response.error)
        else
          resolve(response)
      })
    })
  }

  function listenMessage(callback: (data: ReceiveMessage) => void | Promise<void>) {
    socket.value.on('message', callback)
  }

  function disconnect() {
    socket.value.disconnect()
  }

  onMounted(() => {
    socket.value.connect()
  })

  onBeforeUnmount(() => {
    socket.value.disconnect()
  })

  provide<SocketProvider>(socketKey, {
    send,
    listenMessage,
    disconnect,
    isConnected,
  })
}
