<script setup>
import MapNavigationPanel from '../layouts/MapNavigationPanel.vue'
import MapHeader from '../layouts/MapHeader.vue'
import MapControlBar from '../layouts/MapControlBar.vue'
import Map from '../Map.vue'
import { ref } from 'vue'

const isNavOpenRef = ref(true)

const toggleNav = () => {
  isNavOpenRef.value = !isNavOpenRef.value
}
</script>

<template>
  <div class="relative h-screen w-full bg-gray-100">
    <!-- Left Navigation Panel -->
    <MapNavigationPanel 
      :is-open="isNavOpenRef" 
      @toggle="toggleNav"
    />
    
    <!-- Main Content -->
    <div 
      class="flex flex-col h-full transition-all duration-300"
      :class="[isNavOpenRef ? 'ml-64' : 'ml-16']"
    >
      <MapHeader />
      
      <!-- Map Container -->
      <div class="relative flex-1">
        <Map />
        <MapControlBar class="absolute bottom-4 right-4" />
      </div>
    </div>
  </div>
</template>