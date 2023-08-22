<template>
  <Loader
    v-if="isLoading"
    class="m-auto"
    :size="loadingSize"
  />

  <button
    v-else
    :class="`
      m-1
      px-3
      py-2
      text-sm
      shadow-sm
      rounded-md
      font-semibold
      hover:bg-primary-500
      focus-visible:outline
      focus-visible:outline-2
      focus-visible:outline-offset-2
      items-center gap-x-2
      focus-visible:outline-primary-600
      ${hasIcon ? 'inline-flex' : ''}
      ${isWidthFull ? 'w-full' : ''}
      ${!secondary ? 'bg-primary-600 text-white' : ''}
      ${secondary ? 'text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50' : ''}
      ${params()}`
    "
    :disabled="disabled"
    :type="type"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  disabled?: boolean;
  secondary?: boolean;
  hasIcon?: boolean;
  isLoading?: boolean;
  isWidthFull?: boolean;
  loadingSize?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
}>();

const params = () => {
  if (props.disabled) {
    return "disabled:opacity-50";
  }

  return "";
};

</script>
