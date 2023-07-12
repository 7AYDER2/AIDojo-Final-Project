<template>
  <div 
  v-if="isOpen"
  @click.self="closeModal"
  class="flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-black bg-opacity-25 z-[1000]bg-red-400 w-[500px] h-[500px]">
   <transition name="slide-y">
       <PhotosVue :images="props.allImag"/>
   </transition>
  </div>
</template>

<script setup>
 import PhotosVue from './Photos.vue';  

 const props = defineProps({
    isOpen:Boolean,
    allImag:Array
 })

 const emit = defineEmits(['close'])

 const closeModal = ()=>{
    emit('close')
 }
</script>

