type AsyncStatus = 'idle' | 'pending' | 'success' | 'error'

export function useAsyncStatus() {
  const status = ref<AsyncStatus>('idle')

  function setStatus(newStatus: AsyncStatus) {
    status.value = newStatus
  }
  const toIdle = () => setStatus('idle')
  const toPending = () => setStatus('pending')
  const toSuccess = () => setStatus('success')
  const toError = () => setStatus('error')

  const isIdle = computed(() => status.value === 'idle')
  const isPending = computed(() => status.value === 'pending')
  const isSuccess = computed(() => status.value === 'success')
  const isError = computed(() => status.value === 'error')

  return {
    status: {
      isIdle: readonly(isIdle),
      isPending: readonly(isPending),
      isSuccess: readonly(isSuccess),
      isError: readonly(isError),
      value: readonly(status),
    },
    setStatus: {
      toIdle,
      toPending,
      toSuccess,
      toError,
    },

  }
}
