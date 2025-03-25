import type { User } from '~/entities/user.model'

interface ResponseExistsUser {
  exists: boolean
}

export function useAddFriend() {
  const { accessToken } = useAuth()
  const { logAndTrack } = useLogger()
  const loading = ref(false)
  const error = ref<Error>()

  async function checkIfUserExists(username: string) {
    try {
      loading.value = true
      error.value = undefined

      const response = await $fetch<ResponseExistsUser>(`${useRuntimeConfig().public.apiUrl}/users/${username}/exists`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!response.exists) {
        error.value = new Error('Usuário não existe')
      }
    }
    catch (err: any) {
      logAndTrack('useAddFriend:checkIfUserExists', err)
      error.value = err
      return {
        success: false,
        message: 'Erro ao verificar usuário',
      }
    }
    finally {
      loading.value = false
    }
  }

  async function addFriend(username: string) {
    try {
      loading.value = true
      error.value = undefined

      await $fetch<User>(`${useRuntimeConfig().public.apiUrl}/users/add-contact`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: {
          username,
        },
      })
    }
    catch (err: any) {
      logAndTrack('useAddFriend:addFriend', err.data)
      error.value = err.data
    }
    finally {
      loading.value = false
    }
  }

  return {
    checkIfUserExists,
    addFriend,
    loading,
    error,
  }
}
