<script setup lang="ts">
import type { User } from '~/entities/user.model'
import AddContact from '../add-contact/addContact.vue'

const props = defineProps<{
  contacts: User[] | undefined
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'wantsSendMessageTo', username: string): void
  (e: 'contactAdded'): void
}>()

const { user } = inject(mySelfKey)!

const search = ref('')
const searchDebounced = useDebounce(search, 500)

const contacts = computed(() => {
  return props.contacts?.filter((contact) => {
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
  <ul class="mt-4 h-full ">
    <AddContact class="mb-4" @contact-added="() => emit('contactAdded')" />
    <template v-if="!props.loading">
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
    </template>
    <template v-else>
      <li
        v-for="i in 5"
        :key="i"
        class="w-full inline-flex items-center gap-2"
      >
        <USkeleton class="h-12 w-12 rounded-full" />
        <USkeleton class="h-6 w-1/2" />
      </li>
    </template>
  </ul>
  <div class="relative">
    <UDropdownMenu
      :items="[
        [
          {
            label: 'Novo Contato',
            icon: 'i-lucide-user-plus',
            onSelect: () => {
              console.log('New contact')
            },
          },
          {
            label: 'Alterar tema',
            icon: $colorMode.preference === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun',
            onSelect: () => $colorMode.preference = $colorMode.preference === 'dark' ? 'light' : 'dark',
          },
        ], [
          {
            label: 'Sair',
            icon: 'lucide:log-out',
            onSelect: () => {
              console.log('Logout')
            },
          },
        ],
      ]"
      :content="{
        align: 'start',
      }"
    >
      <UButton class="w-full" variant="soft" type="button">
        <UAvatar :alt="user.name" />
        <span>{{ user.name }}</span>
      </UButton>
    </UDropdownMenu>
  </div>
</template>
