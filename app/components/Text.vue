<template>
  <component
    :is="variant ?? 'h1'"
    v-if="type === 'title'"
    :class="classes"
  >
    <b v-if="isBold">
      <slot />
    </b>

    <slot v-else />
  </component>

  <component
    :is="variant ?? 'h1'"
    v-else-if="type === 'subtitle'"
    :class="classes"
  >
    <b v-if="isBold">
      <slot />
    </b>

    <slot v-else />
  </component>

  <component
    :is="variant ?? 'p'"
    v-else
    :class="classes"
  >
    <b v-if="isBold">
      <slot />
    </b>

    <slot v-else />
  </component>
</template>

<script lang="ts" setup>
const props = defineProps<{
    type?: "title" | "subtitle" | "base";
    isBold?: boolean;
    variant?: string;
    center?: boolean;
  }>();

const classes = ["text-lg md:text-xl text-gray-900 ", props?.center ? "text-center" : ""];

</script>
