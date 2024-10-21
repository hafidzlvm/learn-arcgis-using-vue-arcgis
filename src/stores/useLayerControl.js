// stores/useLayerControl.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useLayerStore } from '@musasutisna/vue-gis'

export const useLayerControlStore = defineStore('layerControl', () => {
  const layerStore = useLayerStore()
  
  // Reactive References
  const layerOpacityRef = ref({}) // Store opacity values by layer ID
  const layerVisibilityRef = ref({}) // Store visibility state
  const layerOrderRef = ref([]) // Store layer order
  const activeGroupRef = ref(null)
  const activeCategoryRef = ref(null)
  
  // Computed
  const cVisibleLayers = computed(() => {
    return Object.entries(layerVisibilityRef.value)
      .filter(([_, isVisible]) => isVisible)
      .map(([id]) => id)
  })

  const cLayersByCategory = computed(() => {
    if (!layerStore.src) return {}
    
    return Object.values(layerStore.src).reduce((acc, layer) => {
      if (!acc[layer.category]) {
        acc[layer.category] = []
      }
      acc[layer.category].push(layer)
      return acc
    }, {})
  })

  // Methods
  function toggleLayerVisibility(layerId) {
    layerVisibilityRef.value[layerId] = !layerVisibilityRef.value[layerId]
    layerStore.toggleLayer({ layerId, force: layerVisibilityRef.value[layerId] })
  }

  function setLayerOpacity(layerId, opacity) {
    layerOpacityRef.value[layerId] = opacity
    // Implement opacity change through vue-gis
  }

  function reorderLayers(newOrder) {
    layerOrderRef.value = newOrder
    // Implement reordering through vue-gis
  }

  function setActiveCategory(categoryId) {
    activeCategoryRef.value = categoryId
  }

  function setActiveGroup(groupId) {
    activeGroupRef.value = groupId
  }

  return {
    // Refs
    layerOpacityRef,
    layerVisibilityRef,
    layerOrderRef,
    activeGroupRef,
    activeCategoryRef,
    // Computed
    cVisibleLayers,
    cLayersByCategory,
    // Methods
    toggleLayerVisibility,
    setLayerOpacity,
    reorderLayers,
    setActiveCategory,
    setActiveGroup
  }
})