export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/auth/signin' || to.path === '/auth/signup') {
    return true
  }

  const { fetch, loggedIn } = useUserSession()
  if (!loggedIn) {
    await fetch()
  }
  if (!loggedIn) {
    return navigateTo('/auth/signin')
  }
})
