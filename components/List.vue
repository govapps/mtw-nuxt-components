<template>
  <div class="px-4 sm:px-0">
    <h3 class="text-base font-semibold leading-7 text-gray-900">
      {{ title }}
    </h3>
    <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
      {{ subtitle }}
    </p>
  </div>

  <div class="mt-6 border-t border-gray-100">
    <dl class="divide-y divide-gray-100">
      <div
        v-for="item in items"
        :key="item.title"
        class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
      >
        <dt class="text-sm leading-6 text-gray-900 font-bold">
          {{ item.title }}
        </dt>
        <dd class="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          <span class="flex-grow">
            <a
              v-if="item.isUrl && item.desc"
              :href="item.desc"
              class="text-primary-500 hover:text-primary-700"
              target="_blank"
            >
              {{ item.desc }}
            </a>

            <div v-else>
              {{ item.desc }}
            </div>
          </span>
          <span class="ml-4 flex-shrink-0">
            <button
              v-if="item?.button"
              type="button"
              :class="`rounded-md bg-white font-medium text-primary-600 hover:text-primary-500 ${item.button.class}`"
              @click="() => item?.button?.click(item.obj)"
            >
              {{ item.button.label }}
            </button>
          </span>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script lang="ts" setup>

export interface ItemList<T = any> {
  title: string;
  desc: string;
  obj?: any;
  isUrl?: boolean;
  items?: ItemList<T>;
  button?: {
    label: string;
    class: string;
    click: (objRow: any) => void;
  }
}

defineProps<{
  title?: string;
  subtitle?: string;
  items: ItemList[];
}>();
</script>
