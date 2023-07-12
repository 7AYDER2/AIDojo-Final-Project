<template>
    <div class="relative w-full min-h-screen">
      <img class="absolute inset-0 w-full h-full" src="../../public/assets/background.jpg" alt="">
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 bg-white rounded-xl">
        <h1 class="text-[2.2rem] font-bold text-center pt-8">SignUp</h1> 
        <div class="flex flex-col justify-center items-center gap-6 mt-10 sm:mt-12">
        <input type="text"
        v-model="userName"
        placeholder="Enter your Username" class="rounded p-2 px-3 sm:px-6 bg-gray-200 focus:outline-none">
        <input type="text"
        v-model="email"
        placeholder="Enter your Email" class="rounded p-2 px-3 sm:px-6 bg-gray-200 focus:outline-none">
        <p v-if="errorDisUi" class="text-red-400 flex justify-start">{{ errorDisUi }}</p>
        <input type="text"
         v-model="password"
        placeholder="Enter your password" class="rounded p-2 px-3 sm:px-6 bg-gray-200 focus:outline-none"> 
          <a href="#" class="text-blue-500"><router-link to="/Login">Do you have an account? Login</router-link></a>
          <button @click="signUp" class="bg-gray-800 font-bold text-white p-2 px-6 rounded mb-[2rem]">SignUp</button>    
        </div> 
      </div>
    </div>
  </template>

  <script setup>
   import axios from 'axios';
   import { ref } from 'vue';
   import { useRouter } from 'vue-router';

   const userName = ref();
   const password = ref();
   const email = ref();
   const errorDisUi = ref();
   const router = useRouter();

   const signUp = ()=>{
       axios.post('http://localhost:8000/signup',{
        userName:userName.value,
        email:email.value,
        password:password.value
       }).then(res=>{
        if(res.status == 200){
          router.push({name:'Homepage',params:{usename:userName.value,email:email.value,password:password.value}})
        }
       }).catch(error=>{
         if(error.response && error.response.status === 400){
          errorDisUi.value = error.response.data.Message;
         } else {
          error.value = 'An error Occured'
         }
         console.log(error)
         console.log(error.response.data.Message)
       })
   }

  </script>
  
  <style>
  
  </style>