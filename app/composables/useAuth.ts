import type { Login, User } from '~/entities/user.model'

interface ResponseApi extends User {
  session: string
}

export function useAuth() {
  const accessToken = useCookie('accessToken', {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
    secure: true,
    sameSite: 'lax',
  })

  function isLogged() {
    return !!accessToken.value
  }

  async function login(data: Login) {
    const response = await $fetch<ResponseApi>(`${useRuntimeConfig().public.apiUrl}/auth/signin`, {
      method: 'POST',
      body: JSON.stringify(data),
    })

    console.log(response)

    accessToken.value = response.session
  }

  async function logout() {
    accessToken.value = ''
  }

  return {
    isLogged,
    logout,
    login,
    accessToken: readonly(accessToken).value,
  }
}
