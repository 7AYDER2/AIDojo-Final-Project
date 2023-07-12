<template> 
    <div v-if="homeDetails"  class="flex justify-center items-center flex-wrap gap-[1rem] mt-[1.5rem]">
        <div v-for="item in homeDetails" :key="item" class="bg-white rounded-lg w-[410px]">
          <router-link :to='{ name: "Details", params: { id: item.id } }'>
            <img class="w-[435px]  h-[303px] object-cover" :src="`http://localhost:8000/images/${item.images[0]}`"  alt="img"/>
          </router-link>
            <div class="p-[1rem]">
              <div class="flex justify-between items-center pb-[1rem] text-[#7366EE]">
                <p class="font-bold text-2xl">{{item.priceOfHouse}}$</p>
                  <IconHeartPlus @click="getIdOfFav(item.id)"/>
              </div>
              <router-link :to='{ name: "Details", params: { id: item.id } }'>
              <h3 class="font-bold text-3xl">{{item.address}}</h3>
              <p class="text-gray-400 py-[1rem] border-b-2">{{desc(item.descriptions)}}</p>
               <div class="flex py-4 items-center gap-[2rem]">
                 <p class="flex gap-2"><IconBedFilled/>{{item.numberOfRooms}} rooms</p>
                 <p class="flex gap-2" > <IconRuler2/>Size {{item.size}}  sq/f</p>
                 
               <!-- <p class="flex gap-2"><span><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bath-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M11 2a1 1 0 0 1 .993 .883l.007 .117v2.25a1 1 0 0 1 -1.993 .117l-.007 -.117v-1.25h-2a1 1 0 0 0 -.993 .883l-.007 .117v6h13a2 2 0 0 1 1.995 1.85l.005 .15v3c0 1.475 -.638 2.8 -1.654 3.715l.486 .73a1 1 0 0 1 -1.594 1.203l-.07 -.093l-.55 -.823a4.98 4.98 0 0 1 -1.337 .26l-.281 .008h-10a4.994 4.994 0 0 1 -1.619 -.268l-.549 .823a1 1 0 0 1 -1.723 -1.009l.059 -.1l.486 -.73a4.987 4.987 0 0 1 -1.647 -3.457l-.007 -.259v-3a2 2 0 0 1 1.85 -1.995l.15 -.005h1v-6a3 3 0 0 1 2.824 -2.995l.176 -.005h3z" stroke-width="0" fill="currentColor"></path>
             </svg></span>{{ item.bathrooms }} bath</p>
            
             
             <p class="flex gap-2"><span><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-tools-kitchen" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M4 3h8l-1 9h-6z"></path>
              <path d="M7 18h2v3h-2z"></path>
              <path d="M20 3v12h-5c-.023 -3.681 .184 -7.406 5 -12z"></path>
              <path d="M20 15v6h-1v-3"></path>
              <path d="M8 12l0 6"></path>
             </svg></span>{{item.kitchen}}kitchen</p> -->
              </div>
            </router-link>
            </div>
 
         </div>
    </div>
    <div v-else class="loading"></div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref,computed } from 'vue';
import {IconBedFilled,IconRuler2,IconHeartPlus}  from '@tabler/icons-vue';
import { useRouter } from 'vue-router';
// import {getImgUrl} from '../helpers/getImg'

const homeDetails = ref([]);
const isFavHouse =ref([])

const token = localStorage.getItem('token')
const getAllHouseDetails = async()=>{
   axios.get('http://localhost:8000/home',{
    headers:{
      Authorization:`Bearer ${token}`
    }
   }).then((res)=>{
        console.log(res.data)
        homeDetails.value =res.data
   }).catch((error)=>{
       console.log(error)
   })
}

const getIdOfFav = (iDFAV) =>{
 
  // router.push({name:'Favourite',params:{id:iDFAV}})
  for(let i =0; i < isFavHouse.length; i++){
    console.log("hellothere")
    if(iDFAV == isFavHouse[i]){
      console.log("id already here")
    }else{
      isFavHouse.value.push(iDFAV)
      console.log(isFavHouse.value)
    }
  } 
}

const desc = ((desc)=>{
  if(desc.length > 30) {
    return desc.substr(0, 30) + '...'
  }
  else {
    return desc
  }
})



onMounted(()=>{
  getAllHouseDetails();
})


</script>

<style scoped>
  
.loading{
    width: 100px;
    height: 100px;
    background-color:transparent;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -50px;
    margin-top: -50px;
    border-radius: 50%;
    border: 5px solid #4a1ee9;
    transition: transform 0.3s;
    border-left-color: transparent;
    animation-name: spin;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>