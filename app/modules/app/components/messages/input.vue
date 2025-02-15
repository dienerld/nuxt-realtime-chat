<script setup lang="ts">
const emit = defineEmits<{
  (e: 'wantsSendMessage', message: string): void
}>()

const message = ref('')
</script>

<template>
  <div class="flex w-full gap-4">
    <UInput
      v-model="message" placeholder="Digite uma mensagem"
      class="w-full" size="lg"
    />
    <UButton
      aria-label="Enviar" variant="solid"
      color="primary" icon="lucide:send-horizontal"
      class="min-w-10 flex items-center justify-center"
      size="lg" @click="emit('wantsSendMessage', message)"
    />
  </div>
</template>
