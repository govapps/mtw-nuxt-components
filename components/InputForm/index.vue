<template>
  <input
    :name="fieldName"
    :value="inputValidate?.value"
    @input="setValue"
  >
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type FormValidate from "./FormValidate";
import type InputValidate from "./InputValidate";

const props = defineProps<{
  fieldName: string,
  formValidate?: FormValidate
}>();
const inputValidate = ref<InputValidate>();

function setValue(e: Event){
  const value = (e.target as HTMLInputElement).value as string;

  inputValidate.value?.setValue(value);
}

onMounted(() => {
  inputValidate.value = props.formValidate?.getInputValidate(props.fieldName);
});

</script>