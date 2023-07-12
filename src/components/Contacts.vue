<template>
  <transition name="fade" mode="out-in">
      <div 
      v-if="isOpen"
      @click.self="closeModal"
      class="flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-black bg-opacity-25 z-[1000]bg-red-400 w-[500px] h-[500px]">
      <transition name="fade" mode="out-in">
         <div class="w-1/4 h-1/2 bg-[#25262B] rounded-md">
            
              <slot></slot>
            
         </div>
      </transition >
      </div>
  </transition>
</template>

<script setup>
 import { defineProps } from 'vue';
 
 const props = defineProps({
    isOpen:Boolean
 })

 const emit = defineEmits(['close'])

 const closeModal = ()=>{
    emit('close')
 }

</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
 opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
</style>