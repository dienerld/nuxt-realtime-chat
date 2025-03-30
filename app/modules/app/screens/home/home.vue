<script lang="ts">
import type { ReceiveMessage } from '@/modules/app/entities/message'
import type { Contact } from '../../entities/contact'
import MessageHeader from '@/modules/app/components/messages/header.vue'
import MessageInput from '@/modules/app/components/messages/input.vue'
import MessageContent from '@/modules/app/components/messages/message/message.vue'
import MessageWrapper from '@/modules/app/components/messages/wrapper.vue'

import Sidebar from '@/modules/app/components/sidebar/sidebar.vue'
import { useGetContacts } from '@/modules/app/composables/useGetContacts'
import { useGetHistory } from '@/modules/app/composables/useGetHistory'
import { socketKey } from '@/modules/app/composables/useSocket'
</script>

<script setup lang="ts">
const { user } = inject(mySelfKey)!
const { send, listenMessage } = inject(socketKey)!
const toast = useToast()

const {
  contacts,
  loading,
  refetch,
} = useGetContacts()
const { historyByRoomId, status: historyStatus, error: historyError } = useGetHistory()

const friend = ref<Contact>()
const rooms: Record<string, ReceiveMessage[]> = reactive({})

function wantsSendMessageTo(username: string) {
  friend.value = contacts.value?.find(contact => contact.username === username)
}

function handleSendMessage(message: string) {
  if (!friend.value) return
  send(friend.value.roomId, message)
}

watch(contacts, async () => {
  contacts.value?.forEach((contact) => {
    if (!rooms[contact.roomId]) {
      rooms[contact.roomId] = []
    }
  })
})

watch(friend, async (FriendValue) => {
  if (!FriendValue) return

  if (FriendValue.roomId && FriendValue.roomId in rooms && rooms[FriendValue.roomId]!.length > 0) return

  if (FriendValue.roomId && rooms[FriendValue.roomId]?.length === 0) {
    const messages = await historyByRoomId(FriendValue.roomId)
    messages.forEach((message) => {
      message.createdAt = new Date(message.createdAt)
      rooms[FriendValue.roomId]?.push(message)
    })
  }
})

watch(historyError, (error) => {
  if (error && historyStatus.isError) {
    toast.add({
      title: 'Erro ao carregar histórico',
      description: error.detail,
      color: 'error',
    })
  }
})

onMounted(() => {
  listenMessage((message) => {
    message.createdAt = new Date(message.createdAt)
    rooms[message.roomId]?.push(message)
  })
})
</script>

<template>
  <div class="grid grid-cols-12 h-full mb-4">
    <div class="col-span-5 md:col-span-3 p-2 border border-dark-200 dark:border-dark-700 flex flex-col">
      <Sidebar
        :contacts
        :loading
        @wants-send-message-to="wantsSendMessageTo"
        @contact-added="refetch"
      />
    </div>
    <div class="col-span-7 md:col-span-9 p-2 border border-dark-200 dark:border-dark-700">
      <template v-if="friend">
        <MessageWrapper :loading="historyStatus.isPending.value">
          <template #header>
            <MessageHeader :user="friend" />
          </template>
          <template #content>
            <MessageContent
              v-for="message in rooms[friend.roomId]"
              :key="message.id"
              :message="message"
              :is-owner-message="message.ownerId === user.id"
            />
          </template>
          <template #footer>
            <MessageInput @wants-send-message="handleSendMessage" />
          </template>
        </MessageWrapper>
      </template>
      <template v-else>
        <span class="text-primary">main</span>
      </template>
    </div>
  </div>
</template>
