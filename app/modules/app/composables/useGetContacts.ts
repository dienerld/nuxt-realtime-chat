import type { User } from '~/entities/user.model'

export interface Contact extends User {
  roomId: string
}
export function useGetContacts() {
  const { accessToken } = useAuth()
  const { data: contacts, error, status, refresh } = useFetch<Contact[]>(`${useRuntimeConfig().public.apiUrl}/users/contacts`, {
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
