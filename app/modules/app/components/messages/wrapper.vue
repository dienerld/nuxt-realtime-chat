<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col size-full">
    <slot name="header" />
    <div class="my-5 flex-1 size-full overflow-auto bg-dark-100 dark:bg-dark-800 rounded-lg p-2">
      <slot name="content" />
    </div>
    <slot name="footer" />
  </div>
</template>
