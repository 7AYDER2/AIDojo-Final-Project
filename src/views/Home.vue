<template>
  <!--Headers compnent-->
  <Headers/>
 <div class="flex flex-col gap-9">

<main class="flex flex-col  px-[5rem] my-[2rem] ">

  <!--Search and title here-->

  <div class="flex justify-between items-center">
    <h2 class="sm:text-[1.7rem] md:text-[3rem] font-bold">Search Properties to rent</h2>
    <div class="relative">
      <input 
      v-model="searchQueryValue" 
      @input="debounceHouseSearch"
      class="p-[0.7rem] rounded-[0.65rem] px-[1rem] text-[1.2rem] focus:outline-none" 
      type="text" 
      placeholder="Search">
    <div v-if="isSearching" >
      <div v-if="searchResults == null">
          <p>Loading ...</p>
       </div> 
       
      <div  
      class="absolute bottom-[-%100] mt-2 w-full p-2 rounded-lg z-10 bg-white overflow-y-scroll scrollbar-hide scr max-h-[23vh]">
           <!--Loop start here-->
           <div v-for="item in searchResults" :key="item" >
            <router-link :to='{ name: "Details", params: { id: item.id } }'>
             
               <mineHouse :item="item" :key="item"/>
              </router-link>
           </div>
       </div>
    </div>
    </div>
  </div>

  <!--Filtering heres-->

  <div class=" bg-white flex justify-between items-center px-[2rem] py-[1rem] border border-slate-300 rounded-md mt-[1.5rem]">

   <div class="sm:p-[0.1rem] flex flex-col justify-center p-[0.5rem] border-r-2">
    <h3 class="font-bold text-gray-400">Location</h3>
    <select class="font-bold bg-white text-[1.5rem] focus:outline-none">
      <option class="text-[1.1rem]" value="" >All</option>
      <option class="text-[1.1rem]" value="option1">Option 1</option>
      <option class="text-[1.1rem]" value="option2">Option 2</option>
      <option class="text-[1.1rem]" value="option3">Option 3</option>
    </select>
   </div>

   <div class="sm:p-[0.1rem] flex flex-col justify-center p-[0.5rem] border-r-2 ">
    <h3 class="font-bold text-gray-400">Size</h3>
    <select class="font-bold bg-white text-[1.5rem] focus:outline-none">
      <option class="text-[1.1rem]" value="" >All</option>
      <option class="text-[1.1rem]" value="option1">Option 1</option>
      <option class="text-[1.1rem]" value="option2">Option 2</option>
      <option class="text-[1.1rem]" value="option3">Option 3</option>
    </select>
   </div>

   <div class="sm:p-[0.1rem] flex flex-col justify-center p-[0.5rem] border-r-2">
    <h3 class="font-bold text-gray-400">Type</h3>
    <select class="font-bold bg-white text-[1.5rem] focus:outline-none">
      <option class="text-[1.1rem]" value="" >All</option>
      <option class="text-[1.1rem]" value="option1">Option 1</option>
      <option class="text-[1.1rem]" value="option2">Option 2</option>
      <option class="text-[1.1rem]" value="option3">Option 3</option>
    </select>
   </div>

   <div class="sm:p-[0.1rem] flex flex-col justify-center p-[0.5rem] border-r-2">
    <h3 class="font-bold text-gray-400">Price</h3>
    <select class="font-bold bg-white text-[1.5rem] focus:outline-none">
      <option class="text-[1.1rem]" value="" >All</option>
      <option class="text-[1.1rem]" value="option1">Option 1</option>
      <option class="text-[1.1rem]" value="option2">Option 2</option>
      <option class="text-[1.1rem]" value="option3">Option 3</option>
    </select>
   </div>
    <button class="bg-black text-white px-[2rem] p-[1rem] rounded-md">Filter</button>
  </div>

  <!--ALL Cards here-->

  <Card/>

</main>
</div>
</template>

<script setup>
import axios from 'axios';
import { computed, ref } from 'vue';
import Card from '@/components/Card.vue';
import {debounce} from "lodash";
import { IconBedFilled,IconBathFilled
  ,IconToolsKitchen } from '@tabler/icons-vue';
import Headers from '@/components/Header.vue';
import mineHouse from '../components/mineHouse.vue';

const searchQueryValue = ref("");
const searchResults = ref();

const isSearching = computed(()=>{
  return searchQueryValue.value !='';
})


const searchHouse =async()=>{
   await axios.get(`http://localhost:8000/search/${searchQueryValue.value}`)
 .then((res)=>{
  searchResults.value = res.data
  console.log(searchResults.value)

 })
}


const debounceHouseSearch = debounce(searchHouse,300)

</script>