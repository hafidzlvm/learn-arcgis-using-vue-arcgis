import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const usePopupStore = defineStore('usePopup', () => {
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
    show,
    hide,
    update
  }
});