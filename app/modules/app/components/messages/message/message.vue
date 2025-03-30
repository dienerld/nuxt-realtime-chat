<script setup lang="ts">
import type { ReceiveMessage } from '~/modules/app/entities/message'

const props = defineProps<{
  message: ReceiveMessage
  isOwnerMessage: boolean
}>()

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
  <div
    :class="{ 'self-end': props.isOwnerMessage }"
    class="max-w-2/3 w-fit bg-primary-700 p-2 rounded-md "
  >
    <p class="text-primary-contrast text-sm">
      {{ props.message.message }}
    </p>
    <p class="text-xs text-primary-contrast/60 text-end">
      {{ formatDate(props.message.createdAt) }}
    </p>
  </div>
</template>
