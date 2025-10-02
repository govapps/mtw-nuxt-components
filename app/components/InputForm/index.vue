<template>
  <textarea
    v-if="type === 'textarea'"
    :name="fieldName"
    :value="inputValidate?.value"
    @input="setValue"
  />

  <input
    v-else
    :name="fieldName"
    :value="inputValidate?.value"
    :type="type"
    @input="setValue"
  >
</template>

<script lang="ts" setup>
import { onMounted, ref, } from "vue";
import type FormValidate from "./FormValidate";
import type InputValidate from "./InputValidate";

const props = defineProps<{
  fieldName: string,
  formValidate?: FormValidate,
  type?: string,
}>();
const inputValidate = ref<InputValidate>();

function setValue (e: Event) {
  const value = (e.target as HTMLInputElement).value as string;

  inputValidate.value?.setValue(value);
}

onMounted(() => {
  inputValidate.value = props.formValidate?.getInputValidate(props.fieldName);
});

</script>
