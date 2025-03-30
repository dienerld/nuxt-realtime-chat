<script setup lang="ts">
import type { ZodFormattedError } from 'zod'
import type { Login } from '~/entities/schemas/user'
import { schemaLogin } from '~/entities/schemas/user'

definePageMeta({
  layout: 'empty',
  middleware: 'auth',
})

const { login } = useAuth()
const router = useRouter()
const toast = useToast()
const dataLogin = ref({
  username: '',
  password: '',
})
const dataErrors = ref<ZodFormattedError<Login>>()

async function handleLogin() {
  const data = schemaLogin.safeParse(dataLogin.value)
  if (!data.success) {
    dataErrors.value = data.error.format()
    function getErrorMessage() {
      if (dataErrors.value?.username?._errors) {
        return `Usuário: ${dataErrors.value.username._errors[0]}`
      }
      if (dataErrors.value?.password?._errors) {
        return `Senha: ${dataErrors.value.password._errors[0]}`
      }
    }

    toast.add({
      title: 'Erro ao fazer login',
      description: getErrorMessage(),
      color: 'error',
    })
    return
  }
  try {
    await login(data.data)
    router.push('/app')
  }
  catch (error: any) {
    console.log(error.response._data)
    toast.add({
      title: 'Erro ao fazer login',
      description: error.response._data.message,
      color: 'error',
    })
    console.log(error)
  }
}
</script>

<template>
  <Header />
  <div class="flex flex-col items-center justify-center gap-4 py-12 px-6 sm:px-10 lg:px-20 max-w-3xl mx-auto size-full">
    <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
      Entrar
    </h1>
    <p class="text-lg font-medium text-dark-500 mt-10">
      Faça o login para acessar a aplicação
    </p>
    <form
      class="mt-20 w-full p-4 flex flex-col gap-4 items-center"
      @submit.prevent="handleLogin"
    >
      <UInput
        v-model="dataLogin.username" placeholder="Username"
        label="Username" type="text"
        class="w-full sm:w-1/2"
      />
      <UInput
        v-model="dataLogin.password" placeholder="Password"
        label="Password" type="password"
        class="w-full sm:w-1/2"
      />
      <UButton
        label="Entrar" variant="solid"
        color="primary" size="lg"
        class="md:block w-full sm:w-1/2 text-center"
        type="submit"
      />
    </form>
  </div>
</template>
