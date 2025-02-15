<script setup lang="ts">
import type { ZodFormattedError } from 'zod'
import { z } from 'zod'
import { schemaSignup, type Signup } from '~~/shared/schemas/user'


const router = useRouter()
const toast = useToast()
const dataLogin = ref({
  name: '',
  username: '',
  password: '',
})
const dataErrors = ref<ZodFormattedError<Signup>>()

async function handleLogin() {
  const data = schemaSignup.safeParse(dataLogin.value)
  if (!data.success) {
    dataErrors.value = data.error.format()
    return
  }
  try {
    await $fetch('/api/auth/signup', {
      method: 'POST',
      body: data.data,
    })
    toast.add({
      title: 'Sucesso',
      description: 'Conta criada com sucesso',
    })
    router.push('/auth/signin')
  }
  catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 py-12 px-6 sm:px-10 lg:px-20 max-w-3xl mx-auto size-full">
    <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
      Entrar
    </h1>
    <p class="text-lg font-medium text-dark-500 mt-10">
      Faça o login para acessar a aplicação
    </p>
    <form class="mt-20 w-full p-4 flex flex-col gap-4 items-center" @submit.prevent="handleLogin">
      <UInput
        v-model="dataLogin.name" placeholder="Name"
        label="Nome" type="text"
        class="w-full sm:w-1/2"
      />

      <UInput
        v-model="dataLogin.username" placeholder="Username"
        label="Username" type="text"
        class="w-full sm:w-1/2"
      />
      <UInput
        v-model="dataLogin.password" placeholder="Password"
        label="Senha" type="password"
        class="w-full sm:w-1/2"
      />
      <UButton
        label="Criar Conta" variant="solid"
        color="primary" size="lg"
        class="md:block w-full sm:w-1/2 text-center"
        type="submit"
      />
    </form>
  </div>
</template>
