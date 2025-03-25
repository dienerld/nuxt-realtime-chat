import type { Login, User } from '~/entities/user.model'

interface ResponseApiSignin extends User {
  session: string
}

interface ResponseApiSignup {
  id: string
}

interface SignupData {
  name: string
  username: string
  password: string
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
    const response = await $fetch<ResponseApiSignin>(`${useRuntimeConfig().public.apiUrl}/auth/signin`, {
      method: 'POST',
      body: data,
    })

    accessToken.value = response.session
  }

  async function signup(data: SignupData) {
    const response = await $fetch<ResponseApiSignup>(`${useRuntimeConfig().public.apiUrl}/auth/signup`, {
      method: 'POST',
      body: data,
    })

    return response
  }

  async function logout() {
    accessToken.value = ''
  }

  return {
    isLogged,
    logout,
    login,
    accessToken: readonly(accessToken).value,
    signup,
  }
}
