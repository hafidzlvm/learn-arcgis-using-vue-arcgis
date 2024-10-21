<script setup>
import { VueGIS, useMapStore, useLayerStore } from '@musasutisna/vue-gis'
import { usePopupStore } from '@/stores/usePopup'
import { onUnmounted } from 'vue';

const mapStore = useMapStore()
const popupStore = usePopupStore()

function mapReady() {
  mapStore.toAddEvent('drag', (e, arcgis) => {
    handleEventPopup(arcgis)
  })

  mapStore.toAddEvent('mouse-wheel', (e, arcgis) => {
    handleEventPopup(arcgis)
  })

  mapStore.toAddWatch('extent', (e, arcgis) => {
    handleEventPopup(arcgis)
  })

  mapStore.toAddEvent('click', (event, arcgis) => {
    arcgis.view.hitTest(event).then(response => {
      if (response.results.length) {
        const feature = response.results[0].graphic
        const screenPoint = { x: event.x, y: event.y }
        const position = { x: event.mapPoint.x, y: event.mapPoint.y }
        popupStore.show(screenPoint,  position, feature.attributes)
      } else {
        popupStore.hide()
      }
    })    
  })

}

function handleEventPopup(arcgis){
  if (popupStore.isVisibleRef && popupStore.coordinatePosRef) {
    const screenPos = arcgis.view.toScreen(popupStore.coordinatePosRef)
    popupStore.update(screenPos);
  }
}

onUnmounted(() => {
  popupStore.hide()
})
</script>
<template>
  <VueGIS class="w-full h-full inset-0 absolute z-0" @ready="mapReady" />
</template>

<style scoped>
.esri-attribution {
  display: none;
}
</style>