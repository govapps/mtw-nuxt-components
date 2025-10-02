<template>
  <div>
    <label for="toggle4" class="flex cursor-pointer select-none items-center">
      <div class="relative">
        <input
          id="toggle4"
          type="checkbox"
          class="sr-only"
          @change="onChange()"
        >
        <div
          :class="enabled && '!bg-primary'"
          class="block h-8 w-14 rounded-full dark:bg-graydark bg-bodydark"
        />
        <div
          :class="enabled && '!right-1 !translate-x-full'"
          class="absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition"
        />
      </div>
    </label>
  </div>
</template>

<script lang="ts" setup>
import { ref, } from "vue";

const props = defineProps<{
  value?: boolean,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange?:(value: boolean) => void,
}>();

const enabled = ref(!!(props.value));

const onChange = () => {
  enabled.value = !enabled.value;

  if (props.onChange) { props.onChange(enabled.value); }
};

</script>
