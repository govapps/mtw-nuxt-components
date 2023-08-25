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
              ${isError && 'border-2 focus:ring-red-500 border-red-500 focus:border-red-500'}
              ${isError && 'border-2 focus:ring-[#42d392] border-[#42d392]'}
              ${disabled ? 'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200' : ''}
            `"
            :value="value"
            @change="_onChange($event)"
            @blur="_onBlur($event)"

            :disabled="disabled"
            v-show="_valid"
          >
            <option v-if="typeof (options[0]) == 'object'" v-for="o in options" :value="o[fieldValue]" > {{ o[fieldLabel] }} </option>
            <option v-if="typeof (options[0]) == 'string'" v-for="o in options" :value="o" > {{ o }} </option>
          </select>

        <p v-if="showHelperText || _showHelperText" class="text-sm mt-1" :class="{'text-red-500': isError || _isError}">{{ helperText }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUpdated } from "vue";

const _value = ref("");
const _isError = ref(false);
const _showHelperText = ref(false);
const _valid = ref(false);

const props = defineProps({
  id: { type: String },
  name: { type: String },
  value: {
    type: [String, Object, Number],
    default: ""
  },
  label: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: []
  },
  fieldValue: {
    type: String,
    default: ''
  },
  fieldLabel: {
    type: String,
    default: ''
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
});

function validateInput(){
    _valid.value = false;
    var options = props.options;
    if( options ){
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

onMounted(() => {
  _value.value = props.value;
});

function _onValidate () {
  if (props.onValidate && props.validate) {
    let error = true;

    if (props.validate(_value.value)) {
      error = false;
    }

    props?.onValidate(error);

    _showHelperText.value = error;
    _isError.value = error;
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

    if (props.validateWithOnBlur) {
      _onValidate();
    }
  }
}

onUpdated(() => {
  if (props.validateOnUpdate) {
    _onValidate();
  }
});

</script>
