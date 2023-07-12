<template>
  <Header/>
  <div class="flex flex-col items-center bg-white w-[80%] h-[80vh] mx-auto mt-[3rem] rounded-md ">
       <div class="w-[80%] flex items-center justify-center gap-[4rem] mt-[2rem]">
            <img src="../../public/assets/im1.jpg" class="w-[256px] h-[148] rounded-md"  alt="">
            <div class="w-[45%] flex flex-col gap-[4rem] justify-center">
                  <div class="flex items-center  gap-[7rem]">
                     <h3 class="text-[1.5rem]">Los Angelos</h3>
                     <span class="text-[1.5rem]">4,000$</span>
                  </div>
                  <div class="flex items-center gap-[5rem]">
                      <p class="flex items-center gap-2 text-[1.1rem]"><IconBedFilled width="59" height="47"/>4rooms</p>
                      <p class="flex items-center gap-2 text-[1.1rem]"><span><IconRuler2 width="59" height="47"/></span>Size : 200sq/f</p>
                  </div>
            </div>
            <!--Icon here-->
            <IconHeartMinus class="text-red-500"  width="69" height="67"/>
       </div>
  </div>
</template>

<script setup>
  import Header from '../components/Header.vue';
  import axios from 'axios';
  import {IconBedFilled,IconHeartMinus,IconRuler2}  from '@tabler/icons-vue';
   


</script>

<style>

</style>