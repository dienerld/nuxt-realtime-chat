<script setup lang="ts">
import type { User } from '@@/shared/entities/user.model'

const props = defineProps<{
  user?: User | null
}>()
</script>

<template>
  <header
    class="relative flex w-full items-center justify-between py-2 px-4"
  >
    <div class="flex w-auto items-center justify-start">
      <Logo />
    </div>

    <div class="flex  items-center justify-end gap-2">
      <template v-if="props.user">
        <UAvatar :alt="props.user.name" />
      </template>
      <template v-else>
        <UButton
          label="Sign in" variant="ghost"
          class="hidden md:block" color="primary"
          size="lg" to="/auth/signin"
        />
        <UButton
          label="Sign up" variant="solid"
          color="primary" size="lg"
          class="hidden md:block"
          to="/auth/signup"
        />
      </template>
      <ThemeSwitch />
    </div>
  </header>
</template>
