import type { User } from '~/entities/user.model'

export function useGetContacts() {
  const { accessToken } = useAuth()
  const { data: contacts, error, status, refresh } = useFetch<User[]>(`${useRuntimeConfig().public.apiUrl}/users/contacts`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  defineShortcuts({
    meta_z: () => refresh(),
  })

  const loading = computed(() => status.value === 'pending')

  return {
    contacts,
    error,
    loading,
  }
}
