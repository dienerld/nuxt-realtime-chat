import type { User } from '~/entities/user.model'

export interface MySelfProvider {
  user: Ref<User>
  loading: Ref<boolean>
}

export const mySelfKey = Symbol('myselfKey') as InjectionKey<MySelfProvider>

export function useMyself() {
  const user = ref<User>()
  const { logAndTrack } = useLogger()
  const loading = ref(true)
  const session = useAuth()

  provide<MySelfProvider>(mySelfKey, {
    user: user as Ref<User>,
    loading: loading as Ref<boolean>,
  })

  const fetchUser = async () => {
    loading.value = true
    try {
      if (!session.isLogged())
        return
      const response = await $fetch<User>(`${useRuntimeConfig().public.apiUrl}/users/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      if (!response) {
        return
      }
      user.value = response
    }
    catch (error) {
      logAndTrack('useMyself', error)
      session.logout()
    }
    finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchUser()
  })

  return {
    loading,
    user,
  }
}
