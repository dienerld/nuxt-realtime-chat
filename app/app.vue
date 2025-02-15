<script setup lang="ts">
import { pt_br } from '@nuxt/ui/locale'

useHead({
  htmlAttrs: {
    lang: 'pt-br',
  },
})
</script>

<template>
  <NuxtLayout>
    <UApp
      :toaster="{ position: 'top-center', duration: 3000 }"
      :locale="pt_br"
    >
      <NuxtPage />
    </UApp>
  </NuxtLayout>
</template>
