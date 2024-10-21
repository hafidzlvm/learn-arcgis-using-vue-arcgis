<script setup>
import { VueGIS } from '@musasutisna/vue-gis'

function mapReady() {
  // map is ready
}
</script>

<template>
  <div style="position: fixed;top: 0;right: 0;bottom: 0;left: 0;width: 100%;height: 100%;">
    <VueGIS @ready="mapReady" />
  </div>
</template>