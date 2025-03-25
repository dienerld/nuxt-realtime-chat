<script setup lang="ts">
import MessageLoader from '@/modules/app/components/messages/message/loader.vue'

const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div class="flex flex-col size-full">
    <slot name="header" />
    <div class="my-5 flex-1 size-full overflow-auto bg-dark-100 dark:bg-dark-800 rounded-lg p-2">
      <div class="flex flex-col gap-4">
        <MessageLoader v-if="props.loading" />

        <slot v-else name="content" />
      </div>
    </div>
    <slot name="footer" />
  </div>
</template>
