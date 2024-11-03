<script setup>
import { onMounted, ref } from 'vue';
import { useConfigStore } from '@musasutisna/vue-gis/stores/config.js';
import { useCategoryStore } from '@musasutisna/vue-gis/stores/category.js';
import { useGroupStore } from '@musasutisna/vue-gis/stores/group.js';
import { useBasemapStore } from '@musasutisna/vue-gis/stores/basemap.js';
import { useLayerStore } from '@musasutisna/vue-gis/stores/layer.js';
import { useLegendStore } from '@musasutisna/vue-gis/stores/legend.js';
import { useMapStore } from '@musasutisna/vue-gis/stores/map.js';

import { 
  useMapPopupStore,
  useMapZoomStore
} from '@/stores';

const config = useConfigStore();
const category = useCategoryStore();
// const group = useGroupStore();
const basemap = useBasemapStore();
const layer = useLayerStore();
// const legend = useLegendStore(); 
const map = useMapStore();
const domMap = ref(null);

const popupStore = useMapPopupStore();
const zoomStore = useMapZoomStore();

onMounted(async () => {
  await config.toLoadConfigFile();
  await category.toLoadCategoryFile();
  // await group.toLoadGroupFile();
  await basemap.toLoadBasemapFile();
  await layer.toLoadLayerFile(window.config.MAP_URL_LAYER_FILE);
  await map.toInitMap(domMap.value);
  await basemap.toLoadDefaultBasemap();
  await layer.toLoadEnableLayer();
  // await legend.toLoadLegendFile(); 

  popupStore.initializeStore();
  zoomStore.initializeStore();
});
</script>
<template>
  <div class="w-full h-full inset-0 absolute z-0">
    <div ref="domMap" />
  </div>
</template>

<style scoped>
/* remove border outline map */
.esri-view {
  --esri-view-outline-color: none !important;
  --esri-view-outline: 0;
  --esri-view-outline-offset: 0;
}
::-webkit-scrollbar {
  display: none;
}
</style>