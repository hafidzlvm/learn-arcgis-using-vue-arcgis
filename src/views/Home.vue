<script setup>
import Map from '@/components/Map.vue';
import Popup from '@/components/popup/Popup.vue';
import MapHeader from '@/components/layouts/MapHeader.vue';
import MapSidebar from '@/components/layouts/MapSidebar.vue';
import MapNavigation from '@/components/layouts/MapNavigation.vue';
import MapNavigationLayer from '@/components/layouts/MapNavigationLayer.vue';

import { ref } from 'vue';

const isNavOpenRef = ref(false);

const toggleNav = () => {
  isNavOpenRef.value = !isNavOpenRef.value;
};
</script>
<template>
  <MapSidebar v-on:toggle="toggleNav" :is-open="isNavOpenRef" />
  <MapHeader :class="[isNavOpenRef ? 'ml-64' : 'ml-16']" />
  <MapNavigation />
  <MapNavigationLayer/>

  <Map />

  <Popup />
</template>
