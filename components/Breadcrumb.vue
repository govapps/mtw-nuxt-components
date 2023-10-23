<template>

  <nav class="w-full rounded-md">
    <ol class="list-reset flex">
      <span v-for="(el, index) in items" >
          <li v-if="(index < items.length-1) && el.link" >
            <NuxtLink :href="el.link"
              class="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
              >
                  {{ el.label }}
              </NuxtLink>

                <span v-if="(index < items.length-1) && sep" class="mx-2 text-neutral-500 dark:text-neutral-400" > {{ sep }} </span>
          </li>

          <li v-else class="text-neutral-500 dark:text-neutral-400">
            {{ el.label }}

            <span v-if="(index < items.length-1) && sep" class="mx-2 text-neutral-500 dark:text-neutral-400" > {{ sep }} </span>
          </li>

      </span>
    </ol>
  </nav>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUpdated, } from "vue";

const props = defineProps<{
  navigation: Array< Object >;
  separator?: string;
}>();

const sep = ref(">");
const items = ref([]);

onMounted(() => {
  items.value = props.navigation;
  sep.value = props.separator;
});
</script>