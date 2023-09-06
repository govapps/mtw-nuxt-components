<template>
  <div >
    <label class="text-left block text-sm font-medium leading-6 text-gray-900">{{ label }}</label>
    <div class="mt-2">
        <Combobox v-model="_selectedMany" multiple  >
            <div class="relative mt-1">
                <div
                  :class = "`relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm
                  ${isError || _isError && 'border-2 focus:ring-red-400 border-red-400 focus:border-red-400'}
                  ${_validated && 'border-2 focus:ring-[#42d392] border-[#42d392]'}
                  `"
                >
                  <ComboboxInput
                    class="block  w-full  rounded-md  border-0  py-1.5  text-gray-900  shadow-sm  ring-1  ring-inset  ring-gray-300  placeholder:text-gray-400  focus:ring-2  focus:ring-inset  focus:ring-primary-600  sm:text-sm  sm:leading-6"
                    @change="_query = $event.target.value"
                    :displayValue="(o) => o[fieldLabel]"
                    :placeholder="_placeholder"
                    @blur="_onBlur();"

                  />
                  <ComboboxButton
                    class="absolute inset-y-0 right-0 flex items-center pr-2"
                  >
                    <ChevronUpDownIcon
                      class="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </ComboboxButton>
                </div>

                 <TransitionRoot
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  @after-leave="_query = ''; "
                >
                  <ComboboxOptions
                    class=" absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    >

                     <div
                      v-if="_filteredOptions.length === 0 && _query !== ''"
                      class="relative cursor-default select-none py-2 px-4 text-gray-700"
                    >
                      Nada encontrado
                    </div>

                    <ComboboxOption
                    v-for="o in _filteredOptions"
                    :key="o[fieldValue]"
                    :value="o"
                      as="template"
                      v-slot="{ selected, active }"
                      @click="_onChange();"
                    >
                      <li
                        class="relative cursor-default select-none py-2 pl-10 pr-4"
                        :class="{
                          'bg-teal-400 text-white': active,
                          'text-gray-900': !active,
                        }" >

                        <span
                          class="block truncate"
                          :class="{ 'font-medium': selected, 'font-normal': !selected }"
                        >
                          {{ o[fieldLabel] }}
                        </span>

                        <span
                          v-if="selected"
                          class="absolute inset-y-0 left-0 flex items-center pl-3"
                          :class="{ 'text-white': active, 'text-teal-600': !active }"
                        >
                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </li>
                    </ComboboxOption>

                  </ComboboxOptions>

                </TransitionRoot>

                <ComboboxLabel class="mt-2">
                  <slot />
                </ComboboxLabel>
              </div>
        </Combobox>

        <p v-if="showHelperText || _showHelperText" class="text-sm mt-1" :class="{'text-red-500': isError || _isError}">{{ helperText }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onUpdated, onMounted, } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxLabel,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue"

import { CheckIcon, ChevronUpDownIcon, } from "@heroicons/vue/20/solid";

const props = defineProps<{
    options: Array< Object | string | number >;
    fieldLabel: string;
    fieldValue: string;
    value?: Array< Object | string | number >;
    label?: string;
    onChange?: (value: any) => void;
    placeholder?: string;
    isError?: boolean;
    showHelperText?: boolean;
    helperText?: string;
    onBlur?: (value: string, event: any) => void;
    validateWithOnBlur?: boolean;
    validate?: (value: string) => boolean;
    onValidate?: (isError: boolean) => void;
    validateOnUpdate?: boolean;
  }>();

const _query = ref("");
const _filteredOptions = computed(() =>
  _query.value === ""
    ? props.options
    : props.options.filter((o) => {
      return o[props.fieldLabel].toLowerCase().includes(_query.value.toLowerCase());
    })
);
const _value = ref([]);
const _selectedMany = ref( );
const _placeholder = ref("Search");
const _isError = ref(false);
const _validated = ref(false);
const _showHelperText = ref(false);

function _onChange(){
  if (props?.onChange) {
    props?.onChange(_selectedMany.value);

    if (props.onValidate) {
      _onValidate();
    }
  }
}

function _onValidate () {
  if (props.onValidate && props.validate) {
    let error = true;

    if (props.validate(_selectedMany.value)) {
      error = false;
    }
    props?.onValidate(error);

    _showHelperText.value = error;
    _validated.value = !error;
    _isError.value = error;
  }
}

function _onBlur (event: any) {
  var val = _selectedMany.value;

  if (props.onBlur) {
    props?.onBlur(val);
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

onMounted(() => {
  _selectedMany.value = props.value ?? [];
  _placeholder.value = props.placeholder ?? _placeholder.value;
});

</script>