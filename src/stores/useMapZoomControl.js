import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useConfigStore, useMapStore } from '@musasutisna/vue-gis';
import { ConstantLod } from '@/constant';

export const useMapZoomStore = defineStore('mapZoom', () => {
  const configStore = useConfigStore()
  const mapStore = useMapStore()
  
  const currentZoomRef = ref(0);
  const minZoomRef = ref(1);
  const maxZoomRef = ref(20);
  const isZoomingRef = ref(false);
  const isInitializedRef = ref(false);
  const isDevelopmentMode =
    import.meta.env.MODE === 'development' ? true : false;

  const cCanZoomIn = computed(() => currentZoomRef.value < maxZoomRef.value);
  const cCanZoomOut = computed(() => currentZoomRef.value > minZoomRef.value);

  const initializeStore = async () => {
    mapStore.toAddEvent('mouse-wheel', (e, arcgis) => {
      setCurrentZoomRef(arcgis.view.zoom)
    })
    try {
      const { MapView } = configStore.src;
      currentZoomRef.value = MapView.zoom;
      isInitializedRef.value = true;
    } catch (error) {
      isDevelopmentMode && console.error('Error initializing map zoom store:', error);
      isInitializedRef.value = false;
    }
  };

  async function zoomIn() {
    if (!cCanZoomIn.value || isZoomingRef.value) return;
  
    try {
      isZoomingRef.value = true;
      currentZoomRef.value = currentZoomRef.value + 1

      const scale = ConstantLod[currentZoomRef.value];
      mapStore.toGoTo(
        { zoom: currentZoomRef.value + 1, scale },
        { duration: 200 },
      );
    } catch (error) {
      isDevelopmentMode && console.error('Error during zoom in:', error);
    } finally {
      isZoomingRef.value = false;
    }
  };

  async function zoomOut() {
    if (!cCanZoomOut.value || isZoomingRef.value) return;

    try {
      isZoomingRef.value = true;
      currentZoomRef.value = currentZoomRef.value - 1

      const scale = ConstantLod[currentZoomRef.value];
      mapStore.toGoTo(
        { zoom: currentZoomRef.value - 1, scale: scale },
        { duration: 200 },
      );
    } catch (error) {
      isDevelopmentMode && console.error('Error during zoom out:', error);
    } finally {
      isZoomingRef.value = false;
    }
  };

  const setCurrentZoomRef = (zoom) => {
    currentZoomRef.value = zoom;
  };

  // Reset state
  const resetZoom = () => {
    currentZoomRef.value = minZoomRef.value;
    isZoomingRef.value = false;
  };


  return {
    // State
    currentZoomRef,
    minZoomRef,
    maxZoomRef,
    isZoomingRef,

    // Computed
    cCanZoomIn,
    cCanZoomOut,

    // Actions
    initializeStore,
    zoomIn,
    zoomOut,
    setCurrentZoomRef,
    resetZoom,
  };
});
