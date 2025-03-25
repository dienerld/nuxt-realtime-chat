<script lang="ts">
import type { Contact } from '@/modules/app/composables/useGetContacts'
import type { ReceiveMessage } from '@/modules/app/entities/message'
import MessageHeader from '@/modules/app/components/messages/header.vue'
import MessageInput from '@/modules/app/components/messages/input.vue'
import MessageLoader from '@/modules/app/components/messages/message/loader.vue'
import MessageContent from '@/modules/app/components/messages/message/message.vue'
import MessageWrapper from '@/modules/app/components/messages/wrapper.vue'
import Sidebar from '@/modules/app/components/sidebar/sidebar.vue'

import { useGetContacts } from '@/modules/app/composables/useGetContacts'
import { useGetHistory } from '@/modules/app/composables/useGetHistory'
import { socketKey } from '@/modules/app/composables/useSocket'
</script>

<script setup lang="ts">
const { contacts, loading } = useGetContacts()
const { historyByRoomId, loading: historyLoading } = useGetHistory()
const { user } = inject(mySelfKey)!
const { send, listenMessage } = inject(socketKey)!
const friend = ref<Contact>()

function wantsSendMessageTo(username: string) {
  friend.value = contacts.value?.find(contact => contact.username === username)
}
const rooms: Record<string, ReceiveMessage[]> = reactive({})

function handleSendMessage(message: string) {
  if (!friend.value) return
  send(friend.value.roomId, message)
}

watch(contacts, async () => {
  contacts.value?.forEach((contact) => {
    rooms[contact.roomId] = []
  })
})

watch(friend, async () => {
  if (!friend.value) return
  if (rooms[friend.value.roomId]?.length > 0) return

  if (rooms[friend.value.roomId]?.length === 0) {
    const messages = await historyByRoomId(friend.value.roomId)
    messages.forEach((message) => {
      message.createdAt = new Date(message.createdAt)
      rooms[message.roomId]?.push(message)
    })
  }
})

onMounted(() => {
  listenMessage((message) => {
    message.createdAt = new Date(message.createdAt)
    rooms[message.roomId]?.push(message)
  })
})
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
        <MessageWrapper :loading="historyLoading">
          <template #header>
            <MessageHeader :user="friend" />
          </template>
          <template #content>
            <MessageContent
              v-for="message in rooms[friend.roomId]"
              :key="message.id"
              :message="message"
              :is-owner-message="message.ownerId === user.id"
            />
          </template>
          <template #footer>
            <MessageInput @wants-send-message="handleSendMessage" />
          </template>
        </MessageWrapper>
      </template>
      <template v-else>
        <span class="text-primary">main</span>
      </template>
    </div>
  </div>
</template>
