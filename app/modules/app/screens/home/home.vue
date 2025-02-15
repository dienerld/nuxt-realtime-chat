<script lang="ts">
import type { User } from '~/entities/user.model'
import MessageHeader from '@/modules/app/components/messages/header.vue'
import MessageInput from '@/modules/app/components/messages/input.vue'
import MessageWrapper from '@/modules/app/components/messages/wrapper.vue'
import Sidebar from '@/modules/app/components/sidebar/sidebar.vue'

import { useGetContacts } from '@/modules/app/composables/useGetContacts'

interface Message {
  id: string
  ownerId: string
  message: string
  createdAt: Date
}
</script>

<script setup lang="ts">
const { contacts, loading } = useGetContacts()
const { user } = inject(mySelfKey)!
const friend = ref<User>()

function wantsSendMessageTo(username: string) {
  friend.value = contacts.value?.find(contact => contact.username === username)
}
const messages: Message[] = [
  {
    id: '1',
    ownerId: user.value.id,
    message: 'Olá mundo',
    createdAt: new Date(),
  },
  {
    id: '2',
    ownerId: '2',
    message: 'Olá mundo',
    createdAt: new Date(),
  },
  {
    id: '3',
    ownerId: user.value.id,
    message: 'Oi',
    createdAt: new Date(),
  },
  {
    id: '6',
    ownerId: '2',
    message: 'lorem ipsum sit amet dolor lorem ipsum sit amet dolor lorem ipsum sit amet dolor lorem ipsum sit amet dolorlorem ipsum sit amet dolor lorem ipsum sit amet dolor',
    createdAt: new Date(),
  },
  {
    id: '8',
    ownerId: user.value.id,
    message: 'lorem ipsum sit amet dolor lorem ipsum sit amet dolor lorem ipsum sit amet dolor lorem ipsum sit amet dolorlorem ipsum sit amet dolor lorem ipsum sit amet dolor',
    createdAt: new Date(),
  },

]

function formatDate(date: Date) {
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}
</script>

<template>
  <div class="grid grid-cols-12 h-full mb-4">
    <div class="col-span-5 md:col-span-3 p-2 border border-dark-200 dark:border-dark-700 flex flex-col">
      <Sidebar
        :contacts
        :loading
        @wants-send-message-to="wantsSendMessageTo"
      />
    </div>
    <div class="col-span-7 md:col-span-9 p-2 border border-dark-200 dark:border-dark-700">
      <template v-if="friend">
        <MessageWrapper>
          <template #header>
            <MessageHeader :user="friend" />
          </template>
          <template #content>
            <div
              class="flex flex-col gap-4"
            >
              <div
                v-for="message in messages"
                :key="message.id"
                :class="{
                  'self-end': message.ownerId === user.id,
                }"
                class="max-w-2/3 w-fit bg-primary-900 p-2 rounded-md "
              >
                <p class="text-primary-contrast">
                  {{ message.message }}
                </p>
                <p class="text-xs text-primary-contrast/60 text-end">
                  {{ formatDate(message.createdAt) }}
                </p>
              </div>
            </div>
          </template>
          <template #footer>
            <MessageInput />
          </template>
        </MessageWrapper>
      </template>
      <template v-else>
        <span class="text-primary">main</span>
      </template>
    </div>
  </div>
</template>
