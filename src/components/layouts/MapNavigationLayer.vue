<!-- src/components/map/layer-control/LayerControl.vue -->
<script setup>
import { useMapLayerControlStore } from '@/stores';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';

const layerControlStore = useMapLayerControlStore();
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50">
    <!-- Layer Control Sheet -->
    <Sheet v-model:open="layerControlStore.isOpenStateRef" side="right">
      <SheetContent class="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle>Map Layers</SheetTitle>
          <SheetDescription>
            Toggle visibility of map layers below
          </SheetDescription>
        </SheetHeader>

        <ScrollArea class="h-[500px] w-full rounded-md border p-4 mt-4">
          <div class="space-y-6">
            <!-- Group by Category -->
            <div
              v-for="(category, id) in layerControlStore.cLayersByCategory"
              :key="id"
              class="space-y-3"
            >
              <div class="flex items-center font-medium text-sm text-muted-foreground">
                <Checkbox
                  :class="'me-2'"
                  :id="id"
                  :checked="category.enable"
                  @update:checked="layerControlStore.toggleCategoryVisibility(id)"
                />
                <span class="">
                  {{ category.title }}
                </span>
              </div>

              <div class="space-y-2 ml-2">
                <div
                  v-for="layer in category.layers"
                  :key="layer.id"
                  class="flex items-center space-x-4 rounded-lg border p-3"
                >
                  <Checkbox
                    :id="String(layer.id)"
                    :checked="layer.isVisible"
                    @update:checked="
                      layerControlStore.toggleLayerVisibility(layer.id)
                    "
                  />
                  <label
                    :for="layer.id"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {{ layer.title }}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <ScrollBar />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  </div>
</template>
