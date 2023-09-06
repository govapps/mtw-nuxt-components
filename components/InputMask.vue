<template>
  <div>
    <label class="text-left block text-sm font-medium leading-6 text-gray-900">{{ label }}</label>
    <div class="mt-2">
      <input
        :name="name"
        type="text"
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
          ${isError || _isError && 'border-2 focus:ring-red-400 border-red-400 focus:border-red-400'}
          ${_validated && 'border-2 focus:ring-[#42d392] border-[#42d392]'}
          ${disabled ? 'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200' : ''}
        `"
        :value="_value"
        :disabled="disabled"

        @input="_onChange($event)"

        @blur="_onBlur($event)"

        ref="_element"
        @keyup="_onChangeMask"
        @keydown="_onChangeMask"
      />

      <p
        v-if="showHelperText || _showHelperText"
        class="text-sm mt-1"
        :class="{'text-red-500': isError || _isError}"
      >
        {{ helperText }}
      </p>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { ref, onMounted, onUpdated, } from "vue";

const props = defineProps<{
  mask: string;
  format: string;
  onChange?:(value: string, event: any) => void;
  id?: string;
  name?: string;
  value?: string;
  label?: string;
  placeholder?: string;
  isError?: boolean;
  disabled?: boolean;
  showHelperText?: boolean;
  helperText?: string;
  onBlur?: (value: string, event: any) => void;
  validateWithOnBlur?: boolean;
  validateWhen?: (value: string) => boolean;
  validate?: (value: string) => boolean;
  onValidate?: (isError: boolean) => void;
  validateOnUpdate?: boolean;
}>();

const _element = ref(null);
const _pattern = ref("");
const _mask = ref("");
const _value = ref("");
const _isError = ref(false);
const _showHelperText = ref(false);
const _validated = ref(false);

function _onValidate () {
  if (props.onValidate && props.validate) {
    let error = true;

    if (props.validate(_value.value)) {
      error = false;
    }

    props?.onValidate(error);

    _validated.value = !error;
    _showHelperText.value = error;
    _isError.value = error;
  }
}

function _onChange (event: any) {
  _onChangeMask();
  _value.value = _element.value.value;

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

function doFormat(x: string, pattern: string, mask: string) {
  let strippedValue = x.replace(/[^0-9]/g, "");
  let chars = strippedValue.split("");
  let count = 0;

  let formatted = "";

  for (let i=0; i<pattern.length; i++) {
    const c = pattern[i];

    if (chars[count]) {
      if (/\*/.test(c)) {
        formatted += chars[count];
        count++;
      } else {
        formatted += c;
      }
    } else if (mask) {
      if (mask.split("")[i])
        formatted += mask.split("")[i];
    }
  }

  return formatted;
}

function _onChangeMask() {
  let elem = _element.value;
  const val = doFormat(elem.value, _pattern.value);

  elem.value = doFormat(elem.value, _pattern.value, _mask.value );

  if (elem.createTextRange) {
    let range = elem.createTextRange();

    range.move("character", val.length);
    range.select();
  } else if (elem.selectionStart) {
    elem.focus();
    elem.setSelectionRange(val.length, val.length);
  }
}

onUpdated(() => {
  _pattern.value = props.format;
  _mask.value = props.mask;
  if(props.value){
    _value.value = props.value;
  }
  if (props.validateOnUpdate) {
    _onChangeMask();
    _onValidate();
  }
  //_onChangeMask();
});

onMounted(() => {
  _pattern.value = props.format;
  _mask.value = props.mask;
  _value.value = props.value ?? "";
  //_onChangeMask();
});

</script>