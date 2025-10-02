<template>
  <div
    id="loader-text"
    class="m-auto"
    name="loader-text"
  >
    <Loader
      class="m-auto"
      :size="'md'"
    />
    <p class="text-center text-lg mt-5 text-gray-500">
      {{ text }}.
    </p>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    default: "carregando dados ..."
  }
});
</script>
