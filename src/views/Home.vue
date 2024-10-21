<script setup>
import Map from '@/components/Map.vue';
import PopupTesting from '@/components/popup/PopupTesting.vue';
import MapHeader from '@/components/layouts/MapHeader.vue';
import MapNavigationPanel from '@/components/layouts/MapNavigationPanel.vue';
import MapControlBar from '@/components/layouts/MapControlBar.vue';

import { ref } from 'vue';

const isNavOpenRef = ref(false);

const toggleNav = () => {
  isNavOpenRef.value = !isNavOpenRef.value;
};
</script>
<template>
  <MapNavigationPanel v-on:toggle="toggleNav" :is-open="isNavOpenRef" />
  <MapHeader :class="[isNavOpenRef ? 'ml-64' : 'ml-16']" />
  <MapControlBar/>
  
  <Map />

  <PopupTesting />
</template>
