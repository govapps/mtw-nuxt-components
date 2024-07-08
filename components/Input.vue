<template>
  <div>
    <label class="mb-3 block text-sm font-medium text-black dark:text-white">
      {{ label }}
    </label>

    <div class="mt-2">
      <component
        :is="variant ?? 'input'"
        :id="id"
        :ref="_onRef"
        :name="name"
        :type="type ?? 'text'"
        :placeholder="placeholder"
        :class="`
          w-full
          rounded-lg
          border-[1.5px]
          text-black
          border-stroke
          bg-transparent
          py-3
          px-5
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

      <p
        v-if="showHelperText || _showHelperText"
        class="text-sm mt-1"
        :class="{'text-red': isError || _isError}"
      >
    {{ validates ? _helperText : helperText }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface Validation {
  validate?: (value: string) => boolean;
  message?: string;
}

const _value = ref("");
const _isError = ref(false);
const _showHelperText = ref(false);
const _validated = ref(false);
const _helperText = ref("");

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
  onBlur?:(value: string, event: any) => void;
  onChange?: (value: string, event: any) => void;
  validate?: (value: string) => boolean ;
  validates?: Validation[];
  onValidate?: (isError: boolean) => void;
  validateWhen?: (value: string) => boolean;
}>();

onMounted(() => {
  _value.value = props?.value ?? "";
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
