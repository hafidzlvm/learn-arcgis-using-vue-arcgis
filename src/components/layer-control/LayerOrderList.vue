<!-- components/layer-control/LayerOrderList.vue -->
<script setup>
import { ref } from 'vue'
import { useLayerStore } from '@musasutisna/vue-gis'
// import { MenuSquare } from 'lucide-vue-next'

const props = defineProps({
  layers: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['reorder'])
const layerStore = useLayerStore()

const draggedItemRef = ref(null)

function handleDragStart(layerId) {
  draggedItemRef.value = layerId
}

function handleDragOver(event) {
  event.preventDefault()
}

function handleDrop(targetLayerId) {
  event.preventDefault()
  
  if (!draggedItemRef.value || draggedItemRef.value === targetLayerId) return

  const newOrder = [...props.layers]
  const draggedIndex = newOrder.indexOf(draggedItemRef.value)
  const targetIndex = newOrder.indexOf(targetLayerId)
  
  // Reorder array
  newOrder.splice(draggedIndex, 1)
  newOrder.splice(targetIndex, 0, draggedItemRef.value)
  
  emit('reorder', newOrder)
  draggedItemRef.value = null
}
</script>

<template>
  <div class="layer-order-section">
    <h3>Layer Order</h3>
    <div class="layer-order-list">
      <div
        v-for="layerId in layers"
        :key="layerId"
        class="layer-order-item"
        draggable="true"
        @dragstart="handleDragStart(layerId)"
        @dragover="handleDragOver"
        @drop="handleDrop(layerId)"
      >
        <span class="drag-handle" size="16">tes </span>
        <span class="layer-name">{{ layerStore.src[layerId]?.title }}</span>
        <span class="layer-order">{{ layerStore.src[layerId]?.zindex }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layer-order-section {
  margin-top: 20px;
  border-top: 1px solid #eee;
  padding-top: 16px;
}

.layer-order-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.layer-order-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #f8f8f8;
  border-radius: 4px;
  cursor: move;
  gap: 12px;
}

.layer-order-item:hover {
  background: #f0f0f0;
}

.drag-handle {
  color: #666;
}

.layer-name {
  flex: 1;
}

.layer-order {
  color: #666;
  font-size: 0.875rem;
}

/* Drag and drop styling */
.layer-order-item.dragging {
  opacity: 0.5;
}

.layer-order-item.drag-over {
  border-top: 2px solid #4a9eff;
}
</style>