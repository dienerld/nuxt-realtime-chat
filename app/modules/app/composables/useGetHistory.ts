import type { ReceiveMessage } from '~/modules/app/entities/message'

export function useGetHistory() {
  const { accessToken } = useAuth()
  const loading = ref(true)
  const { logAndTrack } = useLogger()
  const error = ref<Error>()

  async function historyByRoomId(roomId: string): Promise<ReceiveMessage[]> {
    try {
      loading.value = true
      const response = await $fetch<ReceiveMessage[]>(`${useRuntimeConfig().public.apiUrl}/chat/history/${roomId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      return response
    }
    catch (error: any) {
      logAndTrack('useGetHistory', error)
      error.value = error
      return []
    }
    finally {
      loading.value = false
    }
  }

  return {
    historyByRoomId,
    loading,
    error,
  }
}
