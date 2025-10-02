<template>
  <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div v-if="props.title" class="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-7.5">
      <h3 class="font-medium text-black dark:text-white">
        {{ props.title }}
      </h3>
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
  title?: string;
}>();

</script>
