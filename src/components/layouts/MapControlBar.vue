<!-- src/components/layout/MapControlBar.vue -->
<script setup>
import { 
  ZoomIn, 
  ZoomOut,
  Maximize,
  Layers
} from 'lucide-vue-next'
import { useMapStore } from '@musasutisna/vue-gis'

const mapStore = useMapStore()

const handleZoomIn = () => {
  mapStore.toViewMethod('goTo', [{
    zoom: mapStore.view?.zoom + 1
  }])
}

const handleZoomOut = () => {
  mapStore.toViewMethod('goTo', [{
    zoom: mapStore.view?.zoom - 1
  }])
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-2 space-y-2 absolute bottom-4 right-4 z-10">
    <button 
      class="p-2 hover:bg-gray-100 rounded-lg"
      @click="handleZoomIn"
    >
      <ZoomIn class="w-5 h-5" />
    </button>
    
    <button 
      class="p-2 hover:bg-gray-100 rounded-lg"
      @click="handleZoomOut"  
    >
      <ZoomOut class="w-5 h-5" />
    </button>
    
    <div class="border-t border-gray-200 my-2"></div>
    
    <button class="p-2 hover:bg-gray-100 rounded-lg">
      <Maximize class="w-5 h-5" />
    </button>
    
    <button class="p-2 hover:bg-gray-100 rounded-lg">
      <Layers class="w-5 h-5" />
    </button>
  </div>
</template>