export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuth()

  if (to.path === '/auth/signin' || to.path === '/auth/signup') {
    if (auth.isLogged()) {
      return navigateTo('/app')
    }

    return true
  }

  if (!auth.isLogged()) {
    return navigateTo('/auth/signin')
  }
})
