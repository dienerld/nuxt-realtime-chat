<script setup lang="ts">
import type { User } from '~~/shared/entities/user.model'
import MessageHeader from '@/modules/app/components/messages/header.vue'
import MessageWrapper from '@/modules/app/components/messages/wrapper.vue'
import Sidebar from '@/modules/app/components/sidebar/sidebar.vue'
import { useGetContacts } from '@/modules/app/composables/useGetContacts'

const { contacts } = useGetContacts({ userId: '123' })
const user = ref<User>()

function wantsSendMessageTo(username: string) {
  user.value = contacts.value.find(contact => contact.username === username)
}
</script>

<template>
  <div class="grid grid-cols-12">
    <div class="col-span-5 md:col-span-4 p-2 debug">
      <Sidebar
        :contacts
        @wants-send-message-to="wantsSendMessageTo"
      />
    </div>
    <div class="col-span-7 md:col-span-8 p-2 debug">
      <template v-if="user">
        <MessageHeader :user />

        <MessageWrapper :user class="mt-5" />
      </template>
      <template v-else>
        <span class="text-primary">main</span>
      </template>
    </div>
  </div>
</template>
