<template>
  <div class="h-5 w-full bg-neutral-200 dark:bg-gray-300">
    <div
      class="h-5 bg-primary-500 rounded-md"
      :style="{width: `${progress}%`, transition: '2s'}"
    />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  progress: number | string
}>();
</script>
