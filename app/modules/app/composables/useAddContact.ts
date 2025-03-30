import type { User } from '~/entities/user.model'

interface ResponseExistsUser {
  exists: boolean
}

export function useAddContact() {
  const toast = useToast()
  const { apiUrl } = useRuntimeConfig().public

  const { accessToken } = useAuth()
  const { logAndTrack } = useLogger()
  const { setStatus, status } = useAsyncStatus()
  const { error, clearError, handleError, setError } = useLocalError()

  async function checkIfUserExists(username: string) {
    try {
      setStatus.toPending()
      clearError()

      const response = await $fetch<ResponseExistsUser>(`${apiUrl}/users/${username}/exists`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setStatus.toSuccess()
      if (!response.exists) {
        setError({
          title: 'Usuário não existe',
          detail: 'O usuário que você está tentando adicionar não existe',
        })
        setStatus.toError()
      }
    }
    catch (err: any) {
      logAndTrack('useAddContact:checkIfUserExists', err)
      setError({
        title: 'Erro ao verificar usuário',
        detail: 'Ocorreu um erro ao verificar o usuário',
      })
      setStatus.toError()
    }
  }

  async function addContact(username: string) {
    try {
      setStatus.toPending()
      clearError()

      await $fetch<User>(`${apiUrl}/users/add-contact`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: {
          username,
        },
      })
      toast.add({
        title: 'Amigo adicionado',
        description: 'Amigo adicionado com sucesso',
        color: 'success',
      })
      setStatus.toSuccess()
    }
    catch (err: any) {
      logAndTrack('useAddContact:addFriend', err.data)
      handleError(err)
      setStatus.toError()
      toast.add({
        title: 'Erro ao adicionar amigo',
        description: 'Ocorreu um erro ao adicionar o amigo',
        color: 'error',
      })
    }
  }

  return {
    checkIfUserExists,
    addContact,
    error,
    status,
    clearError,
  }
}
