<script lang="ts" setup>
import { useAddContact } from '~/modules/app/composables/useAddContact'

const emit = defineEmits<{
  (e: 'contactAdded'): void
}>()

const isOpen = ref(false)
const { addContact, checkIfUserExists, error, status, clearError } = useAddContact()

const username = ref('')
const usernameDebounced = useDebounce(username, 500)

async function handleAddContact() {
  await addContact(username.value)
  emit('contactAdded')

  if (status.isSuccess.value) {
    isOpen.value = false
  }
}

watch(usernameDebounced, () => {
  if (!usernameDebounced.value) return
  checkIfUserExists(usernameDebounced.value)
})

watch(isOpen, () => {
  if (!isOpen.value) {
    username.value = ''
    clearError()
  }
})
</script>

<template>
  <UModal
    v-model:open="isOpen"
    title="Adicionar Amigo"
    :close="{ color: 'error' }"
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
        :error="error?.title"
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
          :loading="status.isPending.value"
          :disabled="!username || !!error"
          @click="handleAddContact"
        >
          Adicionar
        </UButton>
      </div>
    </template>
  </UModal>
</template>
