
<template>
    <div>
      <div class="flex justify-center items-center mt-[2rem]">
        <img :src="`http://localhost:8000/images/${targetImagse}.jpg`" alt="Target Image" class="w-[91%] h-[450px] object-cover rounded-xl" />
      </div>
      <div class="flex justify-center mt-[2rem] items-center gap-2 ">
        <div  v-for="(image, index) in otherImages" :key="index">
          <img 
            class="w-[237px] h-[158px]"
            :class="{ 'opacity-[0.5]': selectedImage === image }"
             :src="`http://localhost:8000/images/${image}.jpg`" alt="Other Image"
              @click="changeTargetImage(image)" /> 
            </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';

  
  let selectedImage = ref(null) 
       
  const props =defineProps({
    images:Array
  })

  const otherImages = Object.values(props.images).map(str => parseInt(str));

  const targetImagse =  ref(otherImages[0])

  
     const changeTargetImage =(image)=> {
      targetImagse.value = image;
        selectedImage.value = image
      }
    
  </script>