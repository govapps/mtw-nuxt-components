<template>
  <div >
      <TransitionRoot as="template" :show="_sideOpen">
      <Dialog as="div" class="relative z-50 lg:hidden" @close="_sideOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">

            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">

              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="_sideOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>

              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-primary-600 px-6 pb-4">
                <div class="flex h-16 shrink-0 items-center">
                  <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="Your Company" />
                </div>

                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in _items" :key="item.name">
                          <NuxtLink :to="item.link" :class="[useRoute().path === item.link ? 'bg-primary-700 text-white' : 'text-primary-200 hover:text-white hover:bg-primary-700', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                            <component :is="item.icon" :class="[item.current ? 'text-white' : 'text-primary-200 group-hover:text-white', 'h-6 w-6 shrink-0']" aria-hidden="true" />
                            {{ item.name }}
                          </NuxtLink>
                        </li>
                      </ul>
                    </li>

                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-primary-600 px-6 pb-4">
        <div class="flex h-16 shrink-0 items-center">
          <!-- <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="Your Company" /> -->
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in _items" :key="item.name">
                  <NuxtLink :to="item.link" :class="[useRoute().path === item.link ? 'bg-primary-700 text-white' : 'text-primary-200 hover:text-white hover:bg-primary-700', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                    <component :is="item.icon" :class="[item.current ? 'text-white' : 'text-primary-200 group-hover:text-white', 'h-6 w-6 shrink-0']" aria-hidden="true" />
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </li>

          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUpdated } from "vue";

import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  BuildingOffice2Icon,
  FolderPlusIcon,
  BriefcaseIcon,
  WrenchScrewdriverIcon,
  UserCircleIcon,
} from "@heroicons/vue/24/outline";

const _items = ref([]);
const _sideOpen = ref(false)

const props = defineProps<{
  itemsNavigation: Array; // Expects array of objects containing link, name current and icon
  sidebarOpen: boolean;
}>();

onMounted(() => {
  _items.value = props.itemsNavigation;
  _sideOpen.value = props.sidebarOpen;
});

</script>