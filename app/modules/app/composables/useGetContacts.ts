import type { Contact } from '../entities/contact'

export function useGetContacts() {
  const { accessToken } = useAuth()
  const { apiUrl } = useRuntimeConfig().public
  const contacts = ref<Contact[]>([])

  const { data, error, status, refresh } = useFetch<Contact[]>(
    `${apiUrl}/users/contacts`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  )
  defineShortcuts({
    meta_z: () => refresh(),
  })
  const loading = computed(() => status.value === 'pending')

  watch(data, (value) => {
    contacts.value = value ?? []
  })

  return {
    contacts,
    error,
    loading,
    refetch: refresh,
  }
}
