<script setup lang="ts">
const emit = defineEmits<{
  (e: 'wantsSendMessage', message: string): void
}>()

const message = ref('')

function handleSendMessage() {
  emit('wantsSendMessage', message.value)
  message.value = ''
}
</script>

<template>
  <form class="flex w-full gap-4" @submit.prevent="handleSendMessage">
    <UInput
      v-model="message" placeholder="Digite uma mensagem"
      class="w-full" size="lg"
    />
    <UButton
      aria-label="Enviar" variant="solid"
      color="primary" icon="lucide:send-horizontal"
      class="min-w-10 flex items-center justify-center"
      size="lg" type="submit"
    />
  </form>
</template>
