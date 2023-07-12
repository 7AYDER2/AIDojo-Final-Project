<template>
  <div class="relative w-full min-h-screen">
    <img class="absolute inset-0 w-full h-full" src="../../public/assets/background.jpg" alt="">
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 bg-white rounded-xl">
      <h1 class="text-[2.2rem] font-bold text-center pt-8">Login</h1> 
      <div class="flex flex-col justify-center items-center gap-6 mt-10 sm:mt-12">
          <input type="text" 
          v-model="email"
          placeholder="Enter your Email" class="rounded p-2 px-3 sm:px-6 bg-gray-200 focus:outline-none">
          <input type="text"
          v-model="password"
          placeholder="Enter your password" class="rounded p-2 px-3 sm:px-6 bg-gray-200 focus:outline-none"> 
        <a href="#" class="text-blue-500"><router-link to="/SignUp">Don't have an account? SignUp</router-link></a>
        <button @click="login" class="bg-gray-800 font-bold text-white p-2 px-6 rounded mb-[2rem]">LogIn</button>    
      </div> 
    </div>
  </div>
</template>

<script setup>
   import axios from 'axios';
   import { ref } from 'vue';
   import { useRouter } from 'vue-router';

   const email =ref();
   const password = ref();
   const token = ref(localStorage.getItem('token') || '');
   const router = useRouter();

   const login = ()=>{
    axios.post('http://localhost:8000/login',{
      email:email.value,
      password:password.value
    }).then(res=>{
       if(res.status === 200) {
        //update the token value
        token.value = res.data.token;
        //store token in local storage
        localStorage.setItem('token',token.value);
        router.push({name:'Homepage',params:{email:email.value,password:password.value}})
       }
    }).catch(error =>{
      console.log(error)
    })
   }

   //executed before the request is sent to the server.
   // Function to include token in requests
    axios.interceptors.request.use(config=>{
      config.headers.Authorization = `Bearer ${token.value}`;
      return config;
    })

</script>

<style>

</style>