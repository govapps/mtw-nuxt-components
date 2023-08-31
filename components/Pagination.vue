<template>
    <nav aria-label="Page navigation example" v-show="_valid" >
        <ul class="list-style-none flex">
          <li v-show="_showNav">
            <a
              class="pointer-events-none relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 "
              v-if="_current==1"
              > {{ _prev }} </a>
            <a
               class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 "
              href="javascript:void(0)"
              @click="_onClick($event, _current - 1)"
              v-else
              > {{ _prev }} </a>
          </li>

          <li v-for="p in _listPages" :key="p" >
            <a
              v-if="p != _current"
               class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  "
              href="javascript:void(0)"
              @click="_onClick($event, p)"
              > {{ p }} </a>

              <a
              v-else
              class="relative block rounded bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300"
              > {{ p }}
                <span
                class="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]"
                > (current) </span>
              </a>
          </li>
          
          <li v-show="_showNav">
            <a
              class="pointer-events-none relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 "
              v-if="_current==_max"
              > {{ _next }} </a>
            <a
               class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  "
              href="javascript:void(0)"
              @click="_onClick($event, _current + 1)"
              v-else
              > {{ _next }} </a>
          </li>

        </ul>
      </nav>
</template>

<script lang="ts" setup>
import { ExclamationTriangleIcon, ExclamationCircleIcon, CheckCircleIcon, } from "@heroicons/vue/24/outline";

const props = defineProps<{
    total: number;
    perPage: number;
    maxShowPages?: number;
    showPrevNext?: boolean;
    labelPrev?: string;
    labelNext?: string;
    onPageChange?: (pageNumber: number) => void;
  }>();

const _current = ref(1);
const _perPage = ref(20);
const _total = ref(0);
const _maxPages = ref(5);
const _showNav = ref(false);
const _prev = ref("<<");
const _next = ref(">>");
const _valid = ref(false);
const _listPages = ref([]);
const _max = ref(0);

function _onClick (event: any, page: number) {
  _current.value = page;
  if (props?.onPageChange) {
    props?.onPageChange(page);
  }
}

 if(props.total){
    _total.value = props.total;
  }

function checkInput() {
    if(props.showPrevNext){
      _showNav.value = props.showPrevNext;
    }
    if(props.perPage){
      _perPage.value = props.perPage;
    }
    if( _total.value > _perPage.value ){
        _max.value = Math.ceil(_total.value / _perPage.value);
        var pages = [];
        for(var i = 1; i <= _max.value; i++){
          pages.push(i);
        }
        _listPages.value = pages;
        _valid.value = true;
    }
}

watch(_total, value => {
    checkInput();
  }, {deep: true, immediate: true});

onMounted(() => {
  checkInput();
});

</script>