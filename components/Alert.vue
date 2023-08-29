<template>
  <div :class="`${bg100} border-t-4 ${border500} rounded-b ${text900} px-4 py-3 shadow-md`" role="alert">
    <div class="flex">
      <div :class="`-py-1 ${text500}`">
        <ExclamationCircleIcon class="w-6 h-6 mr-4" v-if="type === 'error'" />
        <ExclamationTriangleIcon class="w-6 h-6 mr-4" v-else-if="type === 'warning'"/>
        <CheckCircleIcon class="w-6 h-6 mr-4" v-else />
      </div>
      <div>
        <p class="font-bold">{{ title }}</p>
      </div>
    </div>
    <div class="text-sm"><slot/></div>
  </div>
</template>

<script lang="ts" setup>
import { ExclamationTriangleIcon, ExclamationCircleIcon, CheckCircleIcon, } from "@heroicons/vue/24/outline";

const props = defineProps<{
    type: "error" | "warning" | "success";
    title?: string;
  }>();

const bg100 = ref("bg-teal-100");
const border500 = ref("border-teal-500");
const text500 = ref("text-teal-500");
const text900 = ref("text-teal-900");

function setColors(){
  if(props.type === "error"){
    bg100.value = "bg-red-100";
    border500.value = "border-red-500";
    text500.value = "text-red-500";
    text900.value = "text-red-900";
  }else if(props.type === "warning"){
    bg100.value = "bg-orange-100";
    border500.value = "border-orange-500";
    text500.value = "text-orange-500";
    text900.value = "text-orange-900";
  }
}

onMounted(() => {
  setColors();
});
</script>