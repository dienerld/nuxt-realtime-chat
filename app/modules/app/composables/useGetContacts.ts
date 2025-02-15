import type { User } from '~~/shared/entities/user.model'

interface UseGetContactsOptions {
  userId: string
}

export function useGetContacts({ userId: _ }: UseGetContactsOptions) {
  const contacts = ref<Array<User>>([])

  async function getContacts() {
    return [
      {
        id: '123',
        name: 'Username',
        username: '@username',
      },
      {
        id: '456',
        name: 'Diener Dornelas',
        username: '@diener',
      },
      {
        id: '789',
        name: 'Yanne Fernandes',
        username: '@yanne',
      },
    ]
  }

  onMounted(async () => {
    contacts.value = await getContacts()
  })

  return {
    contacts,
  }
}
