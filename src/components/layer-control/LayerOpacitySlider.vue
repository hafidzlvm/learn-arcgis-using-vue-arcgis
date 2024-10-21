<!-- components/layer-control/LayerOpacitySlider.vue -->
<script setup>
const props = defineProps({
  layerId: {
    type: [Number, String],
    required: true
  },
  opacity: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['update:opacity'])

function handleOpacityChange(event) {
  emit('update:opacity', parseFloat(event.target.value))
}
</script>

<template>
  <div class="opacity-slider">
    <input
      type="range"
      min="0"
      max="1"
      step="0.1"
      :value="opacity"
      @input="handleOpacityChange"
    />
    <span class="opacity-value">{{ Math.round(opacity * 100) }}%</span>
  </div>
</template>

<style scoped>
.opacity-slider {
  display: flex;
  align-items: center;
  gap: 8px;
}

.opacity-value {
  min-width: 48px;
  font-size: 0.875rem;
}
</style>