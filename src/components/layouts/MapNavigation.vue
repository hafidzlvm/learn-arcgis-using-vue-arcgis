<!-- src/components/layout/MapControlBar.vue -->
<script setup>
import { 
  ZoomIn, 
  ZoomOut,
  Maximize,
  Layers
} from 'lucide-vue-next'
import { 
  useMapZoomStore, 
  useMapLayerControlStore
} from '@/stores'

const mapZoomStore = useMapZoomStore()
const layerControlStore = useMapLayerControlStore()

function toggleFullScreen(){
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-2 space-y-2 absolute bottom-4 right-4 z-10">
    <button 
      class="p-2 hover:bg-gray-100 rounded-lg"
      @click="mapZoomStore.zoomIn()"
    >
      <ZoomIn class="w-5 h-5" />
    </button>
    
    <button 
      class="p-2 hover:bg-gray-100 rounded-lg"
      @click="mapZoomStore.zoomOut()"  
    >
      <ZoomOut class="w-5 h-5" />
    </button>
    
    <div class="border-t border-gray-200 my-2"></div>
    
    <button @click="toggleFullScreen" class="p-2 hover:bg-gray-100 rounded-lg">
      <Maximize class="w-5 h-5" />
    </button>
    
    <button @click="layerControlStore.togglePanel" class="p-2 hover:bg-gray-100 rounded-lg">
      <Layers class="w-5 h-5" />
    </button>
  </div>
</template>