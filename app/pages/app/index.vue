<script setup lang="ts">
import Home from '~/modules/app/screens/home/home.vue'

definePageMeta({
  layout: 'protected',
  middleware: ['auth'],
})
</script>

<template>
  <Home />
</template>
