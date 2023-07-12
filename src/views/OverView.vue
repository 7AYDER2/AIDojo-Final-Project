<template>
   <Headers/>
   <div class="relative bg-white ">
      <img class="sm:hidden absolute z-[0] top-0 left-0" src="../../public/assets/overview/Group 1000004135.png" alt="">
      <div class="flex justify-between items-center">
           <div class="sm:ml-[1.2rem] md:ml-[4rem] flex flex-col gap-4">
              <h2 class=" text-[5.7rem] font-bold">Enjoy your stay</h2>
              <h3 class="text-[3.1rem] font-Petit">The best place to rent</h3>
              <p class="text-sm md:text-base lg:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                 Facere totam hic vel modi, nisi quidem laboriosam aut,
                 perferendis qui magnam iusto eos accusantium nobis ducimus 
                 fuga doloribus praesentium illo nam.</p>
              <ul class="flex gap-5 items-center sm:mb-[1rem] md:mt-[5rem]">
                 <li class="bg-black text-white w-fit p-[0.5rem] font-bold px-[2rem]  text-[2rem]"><router-link to="/Homepage">Discover</router-link></li>
                 <li v-if="isNotAuth" class="text-black w-fit p-[0.5rem]  px-[2rem]  text-[2rem] font-bold border border-slate-950 hover:bg-black hover:text-white hover:transition "><router-link to="/Login">Login</router-link></li>
              </ul>
         </div>
        <img class="hidden md:block w-[690px] h-[650px] lg:w-[890px] lg:h-[850px]" src="../../public/assets/overview/Group 1000004143.png" alt="">
    </div>
    <div class=" flex justify-between items-center bg-black h-[49px] ">
      
         <p class="text-white ml-4 text-[1.2rem]">© 2023, All right reseved</p>
         <ol class="flex gap-4 mr-4 ">
             <li><IconBrandFacebook class="text-white"/><a href="#"></a></li>
             <li><IconBrandInstagram class="text-white"/><a href="#"></a></li>
             <li><IconBrandLinkedin class="text-white"/><a href="#"></a></li>
         </ol>
      
    </div>
  </div>
</template>

<script setup>
import { IconBrandFacebook,IconBrandInstagram,IconBrandLinkedin } from '@tabler/icons-vue';
import Headers from '@/components/Header.vue';
import { ref } from 'vue';

const isNotAuth = ref(true);
const token = localStorage.getItem('token')
if(token){ isNotAuth.value =false}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Petit+Formal+Script&display=swap');

 h3 {
    font-family: 'Petit Formal Script', cursive;
 }

 h2 {
    position: relative;
    width: fit-content;
    z-index: 2;
 }

 h2::after{
    content: '';
    background: url('../../public/assets/overview/Group\ 1000004133.png') no-repeat;
    position: absolute;
    width: 40%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
 }


 h2::before{
    content: '';
    background: url('../../public/assets/overview/Group\ 1000004133.png') no-repeat;
    position: absolute;
    width: 20%;
    height: 45%;
    top: 7rem;
    left: 35rem;
    z-index: -1;
 }

 @media (max-width: 500px) {
   h2::before{
      content: '';
      background: url('../../public/assets/overview/Group\ 1000004133.png') no-repeat;
      position: absolute;
      width: 20%;
      height: 45%;
      top: 7rem;
      left: 15rem;
      z-index: -1;
   }

   ul::before {
   display: none;
   }

 }

 ul {
    position: relative;
    z-index: 3;
 }

 ul::before {
    content: '';
    background: url('../../public/assets/overview/Group\ 1000004133.png') no-repeat;
    position: absolute;
    width: 20%;
    height: 100%;
    bottom: 80px;
    left: 0;
    z-index:1;
 }

 @media (max-width: 767px) {
   h2::before{
      content: '';
      background: url('../../public/assets/overview/Group\ 1000004133.png') no-repeat;
      position: absolute;
      width: 20%;
      height: 45%;
      top: 7rem;
      left: 15rem;
      z-index: -1;
   }

}


@media (max-width: 1460px) {
   h2::before{
      content: '';
      background: url('../../public/assets/overview/Group\ 1000004133.png') no-repeat;
      position: absolute;
      width: 20%;
      height: 45%;
      top: 7rem;
      left: 25rem;
      z-index: -1;
   }

}
</style>