// src/stores/useLayerControl.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useCategoryStore, useLayerStore } from '@musasutisna/vue-gis';

export const useMapLayerControlStore = defineStore('layerControl', () => {
  const layerStore = useLayerStore();
  const categoryStore = useCategoryStore();

  const isOpenStateRef = ref(false);

  const cCategory = computed(() => {
    return Object.values(categoryStore.src)
  })

  const cLayers = computed(() => {
    return Object.values(layerStore.src).map((layer) => ({
      id: layer.id,
      title: layer.title,
      isVisible: layer.show,
      category: layer.category,
    }));
  });

  const cLayersByCategory = computed(() => {
    const groupedLayers = {};
    cCategory.value.forEach((category) => {
      const { id, ...rest } = category
      const layers = cLayers.value.filter((layer) => layer.category === category.name)
      const enable = layers.some(layer => layer.isVisible === true)

      groupedLayers[id] = {
        ...rest,
        enable,
        layers,
      }
    })
    return groupedLayers;
  });

  // Actions
  const togglePanel = () => {
    isOpenStateRef.value = !isOpenStateRef.value;
  };

  const closePanel = () => {
    isOpenStateRef.value = false;
  };

  const openPanel = () => {
    isOpenStateRef.value = true;
  };

  const toggleLayerVisibility = async (layerId) => {
    try {
      await layerStore.toggleLayer({
        layerId,
        force: !layerStore.src[layerId].show,
      });
    } catch (error) {
      console.error('Error toggling layer visibility:', error);
    }
  };

  // Toggle all layers in a category
  const toggleCategoryVisibility = async (category) => {
    try {
      const categoryLayers = cLayersByCategory.value[category].layers;
      if (categoryLayers.some((layer) => layer.isVisible === true)) {
        for (const layer of categoryLayers) {
          await layerStore.toggleLayer({
            layerId: layer.id,
            force: false,
          });
        }
      } else if (categoryLayers.every((layer) => layer.isVisible === false)) {
        for (const layer of categoryLayers) {
          await layerStore.toggleLayer({
            layerId: layer.id,
            force: true,
          });
        }
      }
    } catch (error) {
      console.error('Error toggling category visibility:', error);
    }
  };

  return {
    // State
    isOpenStateRef,

    // Computed
    cLayers,
    cLayersByCategory,

    // Actions
    togglePanel,
    closePanel,
    openPanel,
    toggleLayerVisibility,
    toggleCategoryVisibility,
  };
});
