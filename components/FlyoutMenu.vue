<template>
  <Popover class="relative isolate z-50 shadow">
    <div class="bg-white py-5">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <PopoverButton class="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
          Solutions
          <ChevronDownIcon
            class="h-5 w-5"
            aria-hidden="true"
          />
        </PopoverButton>
      </div>
    </div>

    <transition
      enter-active-class="transition ease-out duration-200 z-100"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <PopoverPanel class="z-100 absolute inset-x-0 top-0 -z-10 bg-white pt-16 shadow-lg ring-1 ring-gray-900/5">
        <div class="mx-auto grid max-w-7xl grid-cols-1 gap-2 px-6 py-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-0 sm:py-10 lg:grid-cols-4 lg:gap-4 lg:px-8 xl:gap-8">
          <div
            v-for="item in solutions"
            :key="item.name"
            class="group relative -mx-3 flex gap-6 rounded-lg p-3 text-sm leading-6 hover:bg-gray-50 sm:flex-col sm:p-6"
          >
            <div class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
              <component
                :is="item.icon"
                class="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                aria-hidden="true"
              />
            </div>
            <div>
              <a
                :href="item.href"
                class="font-semibold text-gray-900"
              >
                {{ item.name }}
                <span class="absolute inset-0" />
              </a>
              <p class="mt-1 text-gray-600">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
        <div class="bg-gray-50">
          <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 divide-y divide-gray-900/5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:border-x sm:border-gray-900/5">
              <a
                v-for="item in callsToAction"
                :key="item.name"
                :href="item.href"
                class="flex items-center gap-x-2.5 p-3 px-6 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 sm:justify-center sm:px-0"
              >
                <component
                  :is="item.icon"
                  class="h-5 w-5 flex-none text-gray-400"
                  aria-hidden="true"
                />
                {{ item.name }}
              </a>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel, } from "@headlessui/vue";
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon, RectangleGroupIcon, } from "@heroicons/vue/20/solid";
import { ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon, SquaresPlusIcon, } from "@heroicons/vue/24/outline";

const solutions = [

  {
    name: "Analytics",
    description: "Get a better understanding of where your traffic is coming from",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers with our engagement tool",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  { name: "Security", description: "Your customers' data will be safe and secure", href: "#", icon: FingerPrintIcon },
  {
    name: "Integrations",
    description: "Connect with third-party tools that you're already using",
    href: "#",
    icon: SquaresPlusIcon,
  },
];
const callsToAction = [

  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
  { name: "View all products", href: "#", icon: RectangleGroupIcon },
];

</script>
