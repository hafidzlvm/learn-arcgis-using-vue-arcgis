<script setup>
import { usePopupStore } from '@/stores/usePopup'

const store = usePopupStore()
</script>

<template>
  <Teleport to="body">
    <div v-if="store.isVisibleRef" 
         class="popup-container"
         :style="store.cPopupStyle">
      <div class="popup-content">
        <div class="popup-header">
          <h3>Feature Information</h3>
          <button class="close-btn" @click="store.hide">&times;</button>
        </div>
        <div class="popup-body">
          <div v-for="(value, key) in store.dataRef" 
               :key="key"
               class="popup-item">

            <strong>{{ key }}:</strong> {{ value }}
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<style scoped>

.popup-container {
  position: fixed;
  transform: translate(-50%, -100%);
  /* margin-top: -10px; */
  z-index: 9999;
}

.popup-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  min-width: 250px;
  overflow: hidden;
}

.popup-header {
  background: #f5f5f5;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.popup-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
  padding: 0 4px;
}

.close-btn:hover {
  color: #000;
}

.popup-body {
  padding: 16px;
  max-height: 300px;
  overflow-y: auto;
}

.popup-item {
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.4;
}

.popup-item:last-child {
  margin-bottom: 0;
}
</style>