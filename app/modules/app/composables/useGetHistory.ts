import type { ReceiveMessage } from '~/modules/app/entities/message'

export function useGetHistory() {
  const { accessToken } = useAuth()
  const { setStatus, status } = useAsyncStatus()
  const { logAndTrack } = useLogger()
  const { error, handleError } = useLocalError()

  async function historyByRoomId(roomId: string): Promise<ReceiveMessage[]> {
    try {
      setStatus.toPending()
      const response = await $fetch<ReceiveMessage[]>(`${useRuntimeConfig().public.apiUrl}/chat/history/${roomId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setStatus.toSuccess()
      return response
    }
    catch (err) {
      logAndTrack('useGetHistory', err)
      handleError(err)
      setStatus.toError()
      return []
    }
  }

  return {
    historyByRoomId,
    status,
    error,
  }
}
