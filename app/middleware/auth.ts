export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/auth/signin' || to.path === '/auth/signup') {
    return true
  }

  const auth = useAuth()
  console.log('-->', auth.isLogged())

  if (!auth.isLogged()) {
    return navigateTo('/auth/signin')
  }
})
