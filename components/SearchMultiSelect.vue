<template>
  <div >
    <label class="text-left block text-sm font-medium leading-6 text-gray-900">{{ label }}</label>
    <div class="mt-2">
        <Combobox v-model="_selectedMany" multiple  >
            <div class="relative mt-1">
                <div
                  class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
                >
                  
                  <ComboboxInput
                    class="block  w-full  rounded-md  border-0  py-1.5  text-gray-900  shadow-sm  ring-1  ring-inset  ring-gray-300  placeholder:text-gray-400  focus:ring-2  focus:ring-inset  focus:ring-primary-600  sm:text-sm  sm:leading-6"
                    @change="_query = $event.target.value"
                    :displayValue="(o) => o[fieldLabel]"
                    v-if="hasSearch"
                    placeholder="pesquisar Unidade"
                  />
                  <ComboboxInput 
                     class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  v-else  />
                  
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
                  @after-leave="_query = ''"
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

    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import {
    Combobox,
    ComboboxInput,
    ComboboxLabel,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
  } from '@headlessui/vue'

import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
    options: Array;
    fieldLabel: string;
    fieldValue: string;
    value?: any;
    hasSearch?: boolean;
    label?: string;
    onChange?: (value: any) => void;
  }>();

const _query = ref("");
const _filteredOptions = computed(() =>
    _query.value === ''
      ? props.options
      : props.options.filter((o) => {
          return o[props.fieldLabel].toLowerCase().includes(_query.value.toLowerCase())
        })
  );
const _value = ref([]);
const _selectedMany = ref([]);
const _valid = ref(false);

function validateInput(){
    _valid.value = false;

    var flag = true;
    if(props.value){
      var valueType = typeof(props.value)
      if(valueType!='number' && valueType!='string'){
        flag = false;
        console.log("[Error] - Invalid type for select tag value"); 
      }
    }

    var options = props.options;
    if( options && flag){
        if( Array.isArray(options) ){
            if( options.length > 0){
                var typ = typeof(options[0]);
                var cnt = 0;
                for( var o of options){
                    if( typeof(o) == typ ){
                        if(typ=='object' && ! Array.isArray(o) ){
                            cnt+=1;
                        }
                    }
                }
                var valid_types = ['number', 'string','object'];
                if(cnt == options.length){
                    if( valid_types.includes(typ) ){
                        if(typ == 'object'){
                            if( props.fieldValue && props.fieldLabel  ){
                                cnt = 0;
                                for( var o of options){
                                    var keys = Object.keys(o);
                                    if( keys.includes(props.fieldValue) && keys.includes(props.fieldLabel) ){
                                        cnt+=1;
                                    }
                                }
                                if(cnt == options.length){
                                    _valid.value = true;
                                }
                                else{
                                    console.log("[Error] - Some of the options array values do not contain the keys specified in fieldValue and fieldLabel");
                                }
                            }
                            else{
                                console.log("[Error] - When options array values are objects, fieldValue and fieldLabel properties are required");
                            }
                        }
                        else{
                            _valid.value = true;
                        }
                    }
                    else{
                        console.log("[Error] - Options array values must be number, string or object");
                    }
                }
                else{
                    console.log("[Error] - Options array values have mixed types");
                }
            }
            else{
                console.log("[Error] - Provide a non empty array of options");
            }
        }
        else{
            console.log("[Error] - Options is not an array");
        }
    }
    else{
        console.log("[Error] - Options is empty");
    }
}

validateInput()

function _onChange(){
  _value.value = _selectedMany.value;

  if (props?.onChange) {
    props?.onChange(_value.value);
  }
}

watch(_selectedMany, value => {
    _onChange();
  }, {deep: true, immediate: true});

onMounted(() => {
  _selectedMany.value = props.value ?? [];
  
});

</script>