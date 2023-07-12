<template>
   <header class="bg-white flex justify-between items-center sm:px-[1rem] md:px-[5rem] h-[85px]">
      <h1 class="font-bold text-[1.3rem]"><router-link to="/Homepage">HOUSECoRner</router-link></h1>
      <nav class="relative">
        <ul v-if="loggedInUser" class="flex gap-5" >
          <li v-if="loggedInUser.role == 'admin'"
          class="flex cursor-pointer bg-[#7366EE] text-white p-[1rem] px-[1.4rem] justify-center items-center gap-4 font-bold"><router-link to="/AdminPanle">Add Department</router-link><IconSquareRoundedPlus/></li>
          <li @click="openFav" class="flex bg-[#7366EE] cursor-pointer text-white p-[1rem] px-[1.4rem] justify-center items-center gap-4 font-bold"><router-link to="/Favourite">Save</router-link><IconHeartFilled/></li>
          <li @click="openDeatils" class="cursor-pointer flex justify-center items-center gap-[1rem] text-white font-bold w-fit p-[0.5rem] px-[1rem]  border border-[#7366EE] bg-[#7366EE] ">
            {{loggedInUser.userName}} 
            <img v-if="loggedInUser.image != null"  class="w-[50px] h-[50px] rounded-full" :src="`http://localhost:8000/usersImages/${loggedInUser.image}`" alt="">
            <img v-else class="w-[50px] h-[50px] rounded-full"  src="../../public/assets/avatar.jpg" alt="">

          </li>
        </ul>
        <ul v-else class="flex gap-5">
          <li class="text-black w-fit p-[0.5rem] px-[1rem]  border border-slate-950 hover:bg-black hover:text-white hover:transition "><router-link to="/Login">Login</router-link></li>
          <li class="bg-black text-white w-fit p-[0.5rem]  px-[1rem] "><router-link to="/SignUp">Sign Up</router-link></li>
        </ul>
        <div v-if="clicked" class="absolute right-0 text-gray-500 shadow-xl bg-white p-[1rem] px-[2rem] z-[1]">
          <ul class="flex flex-col gap-3">
            <li class=" cursor-pointer"><router-link to="/Profile">View Profile</router-link></li>
            <li @click="logout" class=" cursor-pointer">Log Out</li>
          </ul>
         </div>
         <!-- <div v-if="favClick" class="absolute right-[10.4rem] text-gray-500 shadow-xl bg-white p-[1rem] px-[2rem] z-[1]">
          <ul class="flex flex-col gap-3">
            <router-link :to='{ name: "Details", params: { id: item.id } }'>
                <mineHouse/>
              </router-link>
            <li><router-link to="/Favourite"> view all </router-link></li>
          </ul>
         </div> -->
      </nav>
    </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter} from 'vue-router';
import { IconHeartFilled,IconSquareRoundedPlus } from '@tabler/icons-vue';
import axios from 'axios';
import mineHouse from './mineHouse.vue';

const loggedInUser = ref();
const router = useRouter();
const clicked = ref(false);
const favClick = ref(false)
const openDeatils = () =>{return clicked.value = !clicked.value};
const openFav = ()=>{return favClick.value =! favClick.value}

// Checking if token is exist

//1- get the token
const token = localStorage.getItem('token')

if(token) {
  axios.get('http://localhost:8000/user',{
    headers:{
      Authorization:`Bearer ${token}`
    }
  }).then(res=>{
    console.log(res)
    loggedInUser.value = res.data.Profile;
    console.log(loggedInUser.value)
  }).catch(error =>{
    console.log(error)
  })
}

const logout = ()=>{
  localStorage.removeItem('token')
  router.push('/Login')
}



</script>

