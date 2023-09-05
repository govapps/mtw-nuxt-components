<template>
  <div
    class="
    relative flex items-center space-x-3 rounded-lg border
    border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2
    focus-within:ring-indigo-500 focus-within:ring-offset-2
    hover:border-gray-400"
  >
    <div class="min-w-0 flex-auto">
      <a
        href="#"
        class="focus:outline-none"
      >
        <span
          class="absolute inset-0"
          aria-hidden="true"
        />
        <p class="text-sm font-medium text-gray-900">{{ title }}</p>
        <p class="truncate text-sm text-gray-500">{{ subtitle }}</p>
      </a>
    </div>

    <div class="flex items-center gap-x-4">
      <div class="">
        <p class="text-sm leading-6 text-gray-900">
          {{ complement }}
        </p>
        <p class="mt-1 text-xs leading-5 text-gray-500">
          {{ description }}
        </p>
      </div>

      <ChevronRightIcon
        class="h-5 w-5 flex-none text-gray-400"
        aria-hidden="true"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ChevronRightIcon, } from "@heroicons/vue/20/solid";

defineProps<{
  title: string;
  subtitle?: string;
  complement?: string;
  description?: string;
}>();

</script>
