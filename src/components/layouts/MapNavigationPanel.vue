<script setup>
import {
  ChevronLeft,
  ChevronRight,
  Map as MapIcon,
  Settings,
  Layers,
} from 'lucide-vue-next';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['toggle']);

const navItems = [
  { icon: MapIcon, label: 'Map View', route: '/' },
  { icon: Layers, label: 'Layers', route: '/layers' },
  { icon: Settings, label: 'Settings', route: '/settings' },
];
</script>

<template>
  <aside
    class="fixed left-0 top-0 bottom-0 bg-slate-900 shadow-lg transition-all duration-300 z-20 m-2 rounded-lg"
    :class="[isOpen ? 'w-64' : 'w-16']"
  >
    <button
      class="absolute -right-3 top-4 bg-white rounded-full p-1 shadow-md"
      @click="emit('toggle')"
    >
      <ChevronLeft v-if="isOpen" class="w-4 h-4" />
      <ChevronRight v-else class="w-4 h-4" />
    </button>

    <nav class="p-4 space-y-2 h-full">
      <router-link
        v-for="item in navItems"
        :key="item.route"
        :to="item.route"
        class="flex items-center space-x-3 p-2 rounded-lg bg-white hover:bg-gray-300"
        :class="{ 'mt-auto absolute bottom-4 right-0 left-0 m-4': item.icon === Settings }"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span v-if="isOpen" class="transition-opacity duration-200">
          {{ item.label }}
        </span>
      </router-link>
    </nav>
  </aside>
</template>
