<template>
  <div >
      <label class="text-left block text-sm font-medium leading-6 text-gray-900">{{ label }}</label>
      <div class="mt-2">
          <select
            :id="id"
            :name="name"
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
            :value="value"
            @change="_onChange($event)"
            @blur="_onBlur($event)"

            :disabled="disabled"
          >
            <option value="0" > Selecione uma opção </option>
            <option v-if="typeof (options[0]) == 'object'" v-for="o in options" :value="o[fieldValue]" > {{ o[fieldLabel] }} </option>
            <option v-if="typeof (options[0]) == 'string'" v-for="o in options" :value="o" > {{ o }} </option>
          </select>

        <p v-if="showHelperText || _showHelperText" class="text-sm mt-1" :class="{'text-red-500': isError || _isError}">{{ helperText }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUpdated, } from "vue";

const _value = ref("");
const _isError = ref(false);
const _validated = ref(false);
const _showHelperText = ref(false);
const _valid = ref(false);

const props = defineProps<{
  options: Array< Object | number | string>;
  fieldLabel: string;
  fieldValue: string;
  onChange?:(value: string, event: any) => void;
  id?: string;
  name?: string;
  value?: any;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  isError?: boolean;
  showHelperText?: boolean;
  helperText?: string;
  onBlur?: (value: string, event: any) => void;
  validateWithOnBlur?: boolean;
  validateWhen?: (value: string) => boolean;
  validate?: (value: string) => boolean;
  onValidate?: (isError: boolean) => void;
  validateOnUpdate?: boolean;
}>();

onMounted(() => {
  _value.value = props.value;
});

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

function _onValidate () {
  if (props.onValidate && props.validate) {
    let error = true;

    if (props.validate(_value.value)) {
      error = false;
    }

    props?.onValidate(error);

    _showHelperText.value = error;
    _validated.value = !error;
    _isError.value = error;
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

onUpdated(() => {
  if (props.validateOnUpdate) {
    _onValidate();
  }
});

</script>