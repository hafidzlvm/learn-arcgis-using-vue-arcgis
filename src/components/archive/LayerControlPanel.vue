<!-- components/layer-control/LayerControlPanel.vue -->
<script setup>
import { useLayerControlStore } from '@/stores/useMapLayerControl'
import LayerOpacitySlider from './LayerOpacitySlider.vue'
import LayerOrderList from './LayerOrderList.vue'
import { storeToRefs } from 'pinia'

const store = useLayerControlStore()
const { 
  layerOpacityRef, 
  layerVisibilityRef, 
  activeGroupRef,
  activeCategoryRef,
  cLayersByCategory 
} = storeToRefs(store)

</script>

<template>
  <div class="layer-control-panel">
    <!-- Categories -->
    <div class="categories-section">
      <h3>Categories</h3>
      <div 
        v-for="(layers, category) in cLayersByCategory" 
        :key="category"
        class="category-group"
      >
        <div 
          class="category-header"
          @click="store.setActiveCategory(category)"
        >
          {{ category }}
        </div>
        
        <!-- Layer Items -->
        <div 
          v-if="activeCategoryRef === category"
          class="layer-list"
        >
          <div 
            v-for="layer in layers" 
            :key="layer.id"
            class="layer-item"
          >
            <!-- Visibility Toggle -->
            <div class="layer-visibility">
              <input
                type="checkbox"
                :checked="layerVisibilityRef[layer.id]"
                @change="store.toggleLayerVisibility(layer.id)"
              />
            </div>

            <!-- Layer Name -->
            <div class="layer-name">
              {{ layer.title }}
            </div>

            <!-- Opacity Control -->
            <!-- <LayerOpacitySlider 
              :layer-id="layer.id"
              :opacity="layerOpacityRef[layer.id]"
              @update:opacity="store.setLayerOpacity(layer.id, $event)"
            /> -->
          </div>
        </div>
      </div>
    </div>

    <!-- Layer Ordering -->
    <LayerOrderList 
      :layers="cVisibleLayers"
      @reorder="store.reorderLayers"
    />
  </div>
</template>

<style scoped>
.layer-control-panel {
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  padding: 16px;
  min-width: 300px;
  max-height: 80vh;
  overflow-y: auto;
}

.category-group {
  margin-bottom: 16px;
}

.category-header {
  font-weight: 500;
  padding: 8px;
  background: #f5f5f5;
  cursor: pointer;
}

.layer-list {
  padding: 8px 0;
}

.layer-item {
  display: flex;
  align-items: center;
  padding: 8px;
  gap: 12px;
}

.layer-name {
  flex: 1;
}
</style>