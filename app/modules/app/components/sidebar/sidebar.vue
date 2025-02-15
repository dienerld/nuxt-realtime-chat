<script setup lang="ts">
import type { User } from '~~/shared/entities/user.model'

const props = withDefaults(defineProps<{
  contacts: Array<Omit<User, 'id'>>
}>(), {
  contacts: () => [{
    name: 'Username',
    username: '@username',
  }],
})

const emit = defineEmits<{
  (e: 'wantsSendMessageTo', username: string): void
}>()

const search = ref('')
const searchDebounced = useDebounce(search, 500)

const contacts = computed(() => {
  return props.contacts.filter((contact) => {
    if (!search.value)
      return true
    return contact.username.toLowerCase().includes(searchDebounced.value.toLowerCase())
  })
})
</script>

<template>
  <UInput v-model="search" placeholder="Buscar Contato" />
  <p class="mt-4 text-sm font-medium text-dark-800 dark:text-dark-200">
    Contatos
  </p>
  <ul class="mt-4">
    <li
      v-for="contact in contacts"
      :key="contact.username"
      class="w-full inline-flex items-center gap-2"
    >
      <UButton
        variant="ghost" type="button"
        class="w-full"
        @click="emit('wantsSendMessageTo', contact.username)"
      >
        <UAvatar :alt="contact.name" />
        <span class="text-primary">{{ contact.name }}</span>
      </UButton>
    </li>
  </ul>
</template>
