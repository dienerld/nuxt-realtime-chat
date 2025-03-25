<script lang="ts" setup>
import { useAddFriend } from '~/modules/app/composables/useAddFriend'

const isOpen = ref(false)
const { addFriend, checkIfUserExists, error, loading } = useAddFriend()

const username = ref('')
const usernameDebounced = useDebounce(username, 500)

function handleAddContact() {
  addFriend(username.value)
}

watch(usernameDebounced, () => {
  if (!usernameDebounced.value) return
  checkIfUserExists(usernameDebounced.value)
})

watch(isOpen, () => {
  if (!isOpen.value) {
    // clear states
    username.value = ''
    error.value = undefined
  }
})
</script>

<template>
  <div>
    <UModal
      v-model:open="isOpen"
      title="Adicionar Amigo"
      :close="{
        color: 'error',
      }"
    >
      <UButton
        icon="i-lucide-user-plus"
        variant="soft"
        class="w-full mt-4"
        @click="isOpen = true"
      >
        Adicionar Amigo
      </UButton>

      <template #body>
        <UFormField
          label="Nome de usuário"
          :error="error?.message"
        >
          <UInput
            v-model="username"
            placeholder="Digite o nome de usuário"
            :error="!!error"
            class="w-full"
            @keyup.enter="handleAddContact"
          />
        </UFormField>

        <div class="flex justify-end gap-2 mt-4">
          <UButton
            variant="ghost"
            @click="isOpen = false"
          >
            Cancelar
          </UButton>
          <UButton
            variant="solid"
            :loading="loading"
            :disabled="!username || !!error"
            @click="handleAddContact"
          >
            Adicionar
          </UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>
