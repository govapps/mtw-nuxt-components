<template>
  <Loader
    v-if="isLoading"
    class="m-auto"
    :size="loadingSize"
  />

  <button
    v-else
    :class="`
      inline-flex
      items-center
      justify-center
      gap-2.5
      py-4
      px-10
      text-center
      font-medium
      lg:px-8
      xl:px-10
      bg-primary
      text-white
      rounded-md
      ${!disabled ? 'hover:bg-opacity-90': '!bg-[#EFF4FB] !text-[#64748B]'}
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
