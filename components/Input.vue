<template>
  <label class="mb-3 block text-sm font-medium text-black dark:text-white">
    {{ label }}
  </label>

  <div class="relative">
    <div v-if="iconPosition" :class="`flex absolute ${props.iconPosition === 'right' ? 'right-2' : 'left-2'} top-1/2 transform -translate-y-1/2`">
      <slot name="icon" />
    </div>

    <component
      :is="variant ?? 'input'"
      :id="id"
      :ref="_onRef"
      :name="name"
      :type="type ?? 'text'"
      :placeholder="placeholder"
      :class="`
        ${_contentPadding}
        w-full
        rounded
        border-[1.5px]
        text-black
        border-stroke
        bg-transparent
        py-2
        px-2
        font-normal
        outline-none
        transition
        focus:border-primary
        active:border-primary
        dark:text-white
        dark:border-form-strokedark
        dark:bg-form-input
        dark:focus:border-primary
        ${isError || _isError && 'border-[1.5px] dark:!border-danger focus:!ring-danger !border-danger focus:!border-danger'}
        ${_validated && 'border-[1.5px] focus:!ring-success !border-success'}
        ${disabled ? 'disabled:cursor-not-allowed disabled:bg-whiter disabled:text-[#a7a7a7] disabled:ring-gray-3 dark:disabled:bg-black' : ''}
      `"
      :value="value"
      :disabled="disabled"
      @input="_onChange($event)"
      @blur="_onBlur($event)"
    />
  </div>

  <p
    v-if="showHelperText || _showHelperText"
    class="text-sm mt-1"
    :class="{'text-red': isError || _isError}"
  >
    {{ validates ? _helperText : helperText }}
  </p>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUpdated, } from "vue";

export interface Validation {
  validate?: (value: string) => boolean;
  message?: string;
}

const _value = ref("");
const _isError = ref(false);
const _showHelperText = ref(false);
const _validated = ref(false);
const _helperText = ref("");
const _contentPadding = ref("");

const props = defineProps<{
  variant?: string;
  id?: string;
  name?: string;
  value?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  isError?: boolean;
  disabled?: boolean;
  showHelperText?: boolean;
  helperText?: string;
  validateWithOnBlur?: boolean;
  validateOnUpdate?: boolean;
  blockPaste?: boolean;
  blockCopy?: boolean;
  iconPosition?: "left" | "right";
  onBlur?:(value: string, event: any) => void;
  onChange?: (value: string, event: any) => void;
  validate?: (value: string) => boolean ;
  validates?: Validation[];
  onValidate?: (isError: boolean) => void;
  validateWhen?: (value: string) => boolean;
}>();

onMounted(() => {
  _value.value = props?.value ?? "";
  if (props.iconPosition) {
    props.iconPosition === "right" ? _contentPadding.value = "pr-8" : _contentPadding.value = "pl-8";
  }
});

function _onValidate () {
  if (props.onValidate && (props.validate || Array.isArray(props.validates))) {
    let error = false;
    let helperText = "";
    let hasError = false;

    if (props.validates && Array.isArray(props.validates)) {
      const validations = props.validates;

      for (let i = 0; i < validations.length; i++) {
        if (validations[i].validate && !validations[i]?.validate?.(_value.value) && !hasError) {
          error = true;
          hasError = true;
          helperText = validations[i].message ?? "";
        }
      }
    } else if (props.validate && !props.validate(_value.value)) {
      error = true;
    }

    props?.onValidate(error);
    _validated.value = !error;
    _showHelperText.value = error;

    _isError.value = error;
    if (hasError) {
      _helperText.value = helperText;
    } else {
      _helperText.value = "";
    }
  }
}

function _onChange (event: any) {
  _value.value = event.target.value;

  if (props?.onChange) {
    props?.onChange(event.target.value, event);

    if (props.onValidate) {
      if (props.validateWhen && props.validateWhen(_value.value)) {
        _onValidate();
      }
    }
  }
}

function _onBlur (event: any) {
  if (props.onBlur) {
    props?.onBlur(event.target.value, event);
  }
  if (props.validateWithOnBlur) {
    _onValidate();
  }
}

function _onRef (el: any) {
  if (el && props.blockPaste) { el.onpaste = (e: Event) => e.preventDefault(); }
  if (el && props.blockCopy) { el.oncopy = (e: Event) => e.preventDefault(); }
  if (el && props.blockCopy) { el.oncut = (e: Event) => e.preventDefault(); }
}

onUpdated(() => {
  if (props.validateOnUpdate) {
    _onValidate();
  }
});

</script>
