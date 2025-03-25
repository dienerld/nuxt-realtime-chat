<script setup lang="ts">
import { useSocket } from '~/modules/app/composables/useSocket'

const { user, loading } = useMyself()

useSocket({ user })
</script>

<template>
  <UContainer class="h-svh max-h-svh flex flex-col">
    <div v-if="loading" class="flex justify-center items-center">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500" />
    </div>
    <template v-else-if="user">
      <div class="size-full py-4">
        <slot />
      </div>
    </template>
  </UContainer>
</template>
