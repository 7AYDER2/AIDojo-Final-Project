<template>
  <Headers/>
  <div v-if="deatilsHouse">
      <div class="flex flex-col gap-6 w-[91%] mx-[auto]">
      <div class="flex justify-center items-center  mt-[1rem] relative ">
        <img class="relative w-[100%] h-[540px] object-cover rounded-xl  " :src="`http://localhost:8000/images/${deatilsHouse.images[0]}`" alt="">
        <h2 class="absolute left-[1rem] bottom-[2rem] text-[2rem] text-white font-bold">Living room</h2>
        <div
        class="absolute w-[200px] h-[120px]  right-[2rem] bottom-[2rem]">
          <img  class="blur-[2px]" src="../../public/assets/im1.jpg" alt=""/>
          <p  @click="isViewPhotoOpen=true" class="cursor-pointer text-white absolute top-[50%] left-[50%] translate-x-[-35%] translate-y-[-35%] w-[9rem] font-bold">view all Photo</p>
        <!--Component to show all photos-->
          <ViewPhotoVue v-if="isViewPhotoOpen" :isOpen="isViewPhotoOpen" :allImag="deatilsHouse.images" @close="handleModaleClose" />
        </div>
      </div>
      <div class="flex gap-4 sm:flex-col md:flex-row">
          <!--Details for the rent apartement--> 
          <div class="sm:w-[100%] md:w-[80%]">
            <div class="flex sm:flex-col md:flex-row justify-between items-center">
              <h2 class="text-5xl font-bold text-black">Apartment for sells</h2>
              <!--Stars-->
              <div class="flex gap-4">
                  <IconStar width="54" height="54" stroke-width="1" />         
                  <IconStar width="54" height="54" stroke-width="1" />         
                  <IconStar width="54" height="54" stroke-width="1" />         
                  <IconStar width="54" height="54" stroke-width="1" />         
              </div>
            </div>
              <!--Locations here-->
              <div class="flex gap-1 mt-[1rem]">
                <IconMapPin/>
                <p class="text-gray-500">{{ deatilsHouse.value.address }}</p>
              </div>
                <p class="mt-[1rem]"><span class="font-bold ">Description :</span>{{deatilsHouse.value.descriptions}}</p>
          </div>
          <div class="flex flex-col  bg-white rounded  p-[1rem] md:w-[30%] 2xl:w-[20%]">
            <!--Component For Show the Contact--> 
              <h4>This is information</h4>
              <p class="text-[1.2rem] text-[#868E96]"><span class="font-bold text-black">Owner:</span>{{deatilsHouse.value.name}}</p>
              <!--Number oF Rooms-->
              <div class="flex justify-start gap-[2rem] mt-3 items-center p-[0.5rem] rounded-xl bg-[#F8F9FA]">
                   <div class="flex ">
                      <h3>Number of rooms :</h3>
                      <p class="flex justify-center items-center gap-2"><span> 
                        <IconBedFilled/></span>4 rooms</p>
                   </div>
                  <p class="flex gap-2"><span><IconRuler2/></span>Size : {{deatilsHouse.value.size}}  sq/f</p>
              </div>
              <!--Days of Rents-->
              <div class="flex gap-[1rem] items-center gap-2 mt-[1.4rem]">
                <div>
                  <h4 class="text-[0.75rem] text-[#868E96]">Total Price</h4>
                  <p class="text-[0.75rem] text-[#868E96]"><span class="text-[1.3rem] font-bold text-black">${{deatilsHouse.value.priceOfHouse}}</span></p>
                </div>
               
              </div>
              <button @click="isContactModelOpen = true" class=" mt-[1rem] bg-[#25262B] p-[1rem] text-[white] font-bold rounded-xl px-[1.5rem]">Show Contacts</button>
          </div>
        </div>
        <!--Another Components name [Another Apartments]-->

    </div>
    <!--Contact Component-->
    <Contacts v-if="isContactModelOpen" :isOpen="isContactModelOpen" @close="handleModaleClose">
        <transition name="fade" mode="out-in">
          <div class="flex flex-col h-[100%] py-[2rem] justify-between">
            <div class="flex justify-center items-center gap-[2rem]">
              <IconMapPinFilled class="text-white" width="69" height="84" />
              <div class="felx flex-col">
                  <h2 class="text-white text-[1.9rem]">ADDRESS:</h2>
                  <p class="text-gray-400 text-[0.8rem]">
                    {{ deatilsHouse.value.address  }}</p>
              </div>
            </div>
            <div class="flex justify-center items-center gap-[2rem]">
              <IconMail class="text-white" width="69" height="84" />
              <div class="felx flex-col">
                  <h2 class="text-white text-[2rem]">Email:</h2>
                  <p v-if="deatilsHouse.value.email !=='undefined'" class="text-gray-400 ">
                      {{ deatilsHouse.value.email }}</p>
                  <p v-else class="text-gray-400 ">NO phone Number available</p>   
              </div>
            </div>
            <div class="flex justify-center items-center gap-[2rem]">
              <IconPhone class="text-white" width="69" height="84" />
              <div class="felx flex-col">
                  <h2 class="text-white text-[2rem]">CALL US:</h2>
                  <p class="text-gray-400">{{ deatilsHouse.value.phoneNumber }}</p>
              </div>
            </div>
          </div>
        </transition>
    </Contacts>
    </div>
</template>

<script setup>
import { onMounted, ref,reactive } from 'vue';
import Contacts from '../components/Contacts.vue';
import Headers from '@/components/Header.vue';

import { IconMapPinFilled,
  IconMail,IconPhone,IconStar,
  IconMapPin,IconBedFilled,IconBathFilled
  ,IconToolsKitchen }  from '@tabler/icons-vue';
import ViewPhotoVue from '../components/ViewPhoto.vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const isContactModelOpen = ref(false);
const isViewPhotoOpen = ref(false);
const props = defineProps(["id"]);
const route = useRoute();

const deatilsHouse = reactive({
  images: [],
  value:{}
});

const fetchData = async()=>{
  console.log(route.params.id)
    await axios.get(`http://localhost:8000/home/${route.params.id}`)
  .then((res)=>{
    console.log(res)
    deatilsHouse.value = res.data
    deatilsHouse.images = deatilsHouse.value.images
    console.log(deatilsHouse.value.images)
    console.log(deatilsHouse)
  }).catch((error)=>{
    console.log(error)
  })
}

const handleModaleClose = () =>{
  isContactModelOpen.value = false;
  isViewPhotoOpen.value =false;
}

onMounted(()=>{
  fetchData()
})
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