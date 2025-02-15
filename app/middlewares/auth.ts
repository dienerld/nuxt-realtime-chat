export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/auth/signin' || to.path === '/auth/signup') {
    return true
  }

  const auth = useAuth()
  if (!auth.isLogged()) {
    return navigateTo('/auth/signin')
  }
})
