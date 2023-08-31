<template>
  <div >
     <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <slot name="content"></slot>
     </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUpdated } from "vue";

onMounted(() => {
});

</script>