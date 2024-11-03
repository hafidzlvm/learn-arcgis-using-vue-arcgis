import { defineStore } from 'pinia';
import { useMapStore } from '@musasutisna/vue-gis';
import { ref, computed } from 'vue';

export const useMapPopupStore = defineStore('usePopup', () => {
  const mapStore = useMapStore();

  const isVisibleRef = ref(false);
  const dataRef = ref(null);
  const screenPosRef = ref(null);
  const coordinatePosRef = ref(null);

  const cPopupStyle = computed(() => {
    return {
      left: `${screenPosRef.value.x}px`,
      top: `${screenPosRef.value.y}px`,
    };
  });

  function initializeStore() {
    mapStore.toAddEvent('drag', (e, arcgis) => {
      handleEventPopup(arcgis)
    })
  
    mapStore.toAddEvent('mouse-wheel', (e, arcgis) => {
      handleEventPopup(arcgis)
    })
  
    mapStore.toAddWatch('extent', (e, arcgis) => {
      handleEventPopup(arcgis)
    })
  
    mapStore.toAddWatch('scale', (e, arcgis) => {
      // console.log(arcgis.view.scale)
      // console.log(arcgis.view.zoom)
    })
  
    mapStore.toAddEvent('click', (event, arcgis) => {
      arcgis.view.hitTest(event).then(response => {
        if (response.results.length) {
          const feature = response.results[0].graphic
          const screenPoint = { x: event.x, y: event.y }
          const position = { x: event.mapPoint.x, y: event.mapPoint.y }
          show(screenPoint,  position, feature.attributes)
        } else {
          hide()
        }
      })
    })
  }
  function handleEventPopup(arcgis){
    if (isVisibleRef.value && coordinatePosRef.value) {
      const screenPos = arcgis.view.toScreen(coordinatePosRef.value)
      update(screenPos);
    }
  }

  function show(screenPos, coordinatePos = null, data = null) {
    screenPosRef.value = screenPos;
    coordinatePosRef.value = coordinatePos || coordinatePosRef.value;
    dataRef.value = data || dataRef.value;
    isVisibleRef.value = true;
  }

  function hide() {
    screenPosRef.value = null;
    coordinatePosRef.value = null;
    dataRef.value = null;
    isVisibleRef.value = false;
  }

  function update(screenPos) {
    if (!screenPosRef.value) return;
    if (!coordinatePosRef.value) return;
    if (!dataRef.value) return;
    screenPosRef.value = screenPos;
  }

  return {
    dataRef,
    isVisibleRef,
    coordinatePosRef,
    cPopupStyle,
    initializeStore,
    show,
    hide,
    update
  }
});