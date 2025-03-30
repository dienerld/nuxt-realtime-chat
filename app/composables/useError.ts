interface LocalError {
  title: string
  detail: string
}

export function useLocalError() {
  const error = ref<LocalError | null>(null)

  function setError(newError: LocalError) {
    error.value = newError
  }

  function clearError() {
    error.value = null
  }

  function handleError(err: unknown) {
    const error = err as any
    if ('data' in error) {
      setError({ title: error.data.error || 'Erro', detail: error.data.message || String(error) })
      return
    }

    if (error instanceof Error) {
      setError({ title: error.name, detail: error.message })
      return
    }

    setError({ title: 'Erro', detail: 'Aconteceu um erro inesperado, tente novamente mais tarde' })
  }

  return { error, setError, clearError, handleError }
}
