<script setup lang="ts">
const { user } = useUserSession()
</script>

<template>
  <UContainer>
    <Header :user />
    <slot />
  </UContainer>
</template>
