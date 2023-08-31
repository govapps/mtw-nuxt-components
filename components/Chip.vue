<template>
  <div
      :class=" `inline-flex [word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] ${bg} ${text500} px-[12px] py-0 text-[13px] font-normal normal-case leading-loose shadow-none transition-[opacity] duration-300 ease-linear` "
       >
     {{label}}
    </div>
</template>

<script lang="ts" setup>
import { ExclamationTriangleIcon, ExclamationCircleIcon, CheckCircleIcon, } from "@heroicons/vue/24/outline";

const props = defineProps<{
    type: "info" | "error" | "warning" | "success";
    label?: string;
  }>();

const bg = ref("bg-gray-300");
const text500 = ref("text-[#00000]");

function setColors(){
  if(props.type === "error"){
    bg.value = "bg-red-400";
    //text500.value = "text-red-500";
  }else if(props.type === "warning"){
    bg.value = "bg-orange-500";
    //text500.value = "text-orange-500";
  }else if(props.type === "success"){
    bg.value = "bg-green-500";
    //text500.value = "text-orange-500";
  }
}

onMounted(() => {
  setColors();
});
</script>