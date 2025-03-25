<script setup lang="ts">

</script>

<template>
  <USkeleton
    v-for="i in 10"
    :key="i"
    class="max-w-2/3 w-1/2 h-8 rounded-md bg-dark-300 dark:bg-dark-700"
    :class="{
      'self-end': i % 2 === 0,
    }"
  />
</template>
