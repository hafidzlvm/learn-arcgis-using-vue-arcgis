<script setup>
import { 
  Bell, 
  User,
  Search
} from 'lucide-vue-next'
import { ref } from 'vue'

const searchQueryRef = ref('')
</script>

<template>
  <div class="flex flex-col h-full transition-all duration-300">
    <header class="bg-white shadow-sm ms-6 m-2 rounded-lg px-2 py-2 z-20">
      <div class="flex items-center justify-between">
        <!-- Search -->
        <div class="flex-1 max-w-xl me-4">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              v-model="searchQueryRef"
              type="text"
              placeholder="Search locations..."
              class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center space-x-4">
          <button class="p-2 hover:bg-gray-100 rounded-full relative">
            <Bell class="w-5 h-5" />
            <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button class="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
            <User class="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  </div>
</template>