<template>
  <div class="px-4 sm:px-0">
    <h3 class="text-base font-semibold leading-7 text-black-2 dark:text-bodydark1">
      {{ title }}
    </h3>
    <p class="mt-1 max-w-2xl text-sm leading-6 text-bodydark">
      {{ subtitle }}
    </p>
  </div>

  <div class="rounded-md border border-stroke py-1 dark:border-strokedark">
    <dl>
      <div
        v-for="item in items"
        :key="item.title"
        class="flex items-center gap-2.5 border-b border-stroke px-5 py-3 last:border-b-0 dark:border-strokedark"
      >
        <dt class="text-sm leading-6 text-graydark dark:text-bodydark1 font-bold">
          {{ item.title }}
        </dt>
        <dd class="mt-1 flex text-sm leading-6 items-center text-graydark dark:text-bodydark sm:col-span-2 sm:mt-0">
          <span class="flex-grow ">
            <a
              v-if="item.isUrl && item.desc"
              :href="item.desc"
              class="text-primary hover:text-meta-5"
              target="_blank"
            >
              {{ item.desc }}
            </a>

            <div v-else class="dark:text-stroke">
              {{ item.desc }}
            </div>
          </span>
          <span class="ml-4 flex-shrink-0">
            <Button
              v-if="item?.button"
              type="button"
              :class="`!py-0 !px-2 ${item.button.class}`"
              @click="() => item?.button?.click(item.obj)"
            >
              {{ item.button.label }}
            </Button>
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
