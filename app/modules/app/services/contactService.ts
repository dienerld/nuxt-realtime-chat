import type { Contact } from '../entities/contact'

async function getOwnerMessage(ownerId: string) {
  const { apiUrl } = useRuntimeConfig().public
  const { accessToken } = useAuth()

  const response = await $fetch<Contact>(`${apiUrl}/users/${ownerId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return response
}

export const contactService = {
  getOwnerMessage,
}
