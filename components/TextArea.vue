<template>
  <label class="block text-sm font-medium leading-6 text-gray-900">{{ label }}</label>
  <div class="mt-2">
    <textarea
      autocomplete="given-name"
      class="
        block
        rounded-md
        border-0
        py-1.5
        text-gray-900
        shadow-sm
        ring-1
        ring-inset
        ring-gray-300
        placeholder:text-gray-400
        focus:ring-2
        focus:ring-inset
        focus:ring-primary-600
        sm:text-sm sm:leading-6
      "
      :value="_value"
      @input="_onChange($event)"
    />
  </div>
</template>

<script lang="ts" setup>
const _value = ref("");

const props = defineProps({
  value: {
    type: String,
    default: ""
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text"
  },
  onChange: {
    type: Function,
    default: () => {}
  }
});

onMounted(() => {
  _value.value = props.value;
});

function _onChange (event: any) {
  _value.value = event.target.value;

  if (props.onChange) { props?.onChange(event.target.value); }
}

</script>
