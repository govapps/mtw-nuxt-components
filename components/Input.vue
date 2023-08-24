<template>
  <label class="text-left block text-sm font-medium leading-6 text-gray-900">{{ label }}</label>
  <div class="mt-2">
    <component
      :id="id"
      :name="name"
      :is="variant"
      :type="type"
      :placeholder="placeholder"
      :class="`
        block
        w-full
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
        sm:text-sm
        sm:leading-6
        ${isError && 'border-2 focus:ring-red-500 border-red-500 focus:border-red-500'}
        ${isError && 'border-2 focus:ring-[#42d392] border-[#42d392]'}
        ${disabled ? 'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200' : ''}
      `"
      :value="value"
      @input="_onChange($event)"
      @blur="_onBlur($event)"

      :disabled="disabled"

      :ref="(el: any) => {
        if(el && blockPaste) el.onpaste = (e: Event) => e.preventDefault();
        if(el && blockCopy) el.oncopy = (e: Event) => e.preventDefault();
      }"
    />

    <p v-if="showHelperText || _showHelperText" class="text-sm mt-1" :class="{'text-red-500': isError || _isError}">{{ helperText }}</p>
  </div>
</template>

<script lang="ts" setup>
import { useValidationsBR, } from "validations-br";

const _value = ref("");
const _isError = ref(false);
const _showHelperText = ref(false);

const props = defineProps({
  variant: {
    type: String,
    default: "input"
  },
  id: { type: String },
  name: { type: String },
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
  placeholder: {
    type: String,
    default: ""
  },
  isError: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  showHelperText: {
    type: Boolean,
    default: false
  },
  helperText: {
    type: String,
    default: ""
  },
  onChange:{
    type: Function,
    default: (event: any) => {}
  },
  onBlur:{
    type: Function,
    default: (event: any) => {}
  },
  validateWithOnBlur: {
    type: Boolean,
    default: false
  },
  validateWhen:{
    type: Function,
    default: undefined
  },
  validate:{
    type: [Function, String],
    default: undefined
  },
  onValidate:{
    type: Function,
    default: undefined
  },
  validateOnUpdate: {
    type: Boolean,
    default: false
  },
  blockPaste:{
    type: Boolean,
    default: false
  },
  blockCopy:{
    type: Boolean,
    default: false
  },
});

onMounted(() => {
  _value.value = props.value;
});

function _onValidate(){
  if(props.onValidate && props.validate){
    let error = true;

    if(typeof props.validate === "string"){
      if(useValidationsBR(props.validate, _value.value)){
        error = false;
      }
    }
    else if(props.validate(_value.value)){
      error = false;
    }

    props?.onValidate(error);

    _showHelperText.value = error;
    _isError.value = error;
  }
}

function _onChange(event: any){
  _value.value = event.target.value;

  if(props?.onChange){
    props?.onChange(event.target.value, event);

    if(props.onValidate){
      if(props.validateWhen && props.validateWhen(_value.value)){
        _onValidate();
      }
    }
  }
}

function _onBlur(event: any){
  if(props.onBlur){
    props?.onBlur(event.target.value, event);

    if(props.validateWithOnBlur){
      _onValidate();
    }
  }
}

onUpdated(() => {
  if(props.validateOnUpdate){
    _onValidate();
  }
});

</script>
