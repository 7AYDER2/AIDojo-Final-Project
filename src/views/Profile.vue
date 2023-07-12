<template>
  <Header/>
      <div v-if="userDetails !=null">
        <div class="flex flex-col items-center bg-white w-[50%] h-[70vh] mx-auto mt-[3rem] rounded-md">
        <div class="bg-gray-400 w-[19.5rem] h-[19.5rem] rounded-full mt-[5rem] flex items-center justify-center relative ">
          <img v-if="userDetails.image != null" class="w-[19.5rem] h-[19.5rem] rounded-full"  :src="`http://localhost:8000/usersImages/${userDetails.image}`" alt="">
          <img v-else class="w-[19.5rem] h-[19.5rem] rounded-full"  src="../../public/assets/avatar.jpg" alt="">
          <div v-if="userDetails.role == 'admin'">
            <IconShieldFilled class="absolute text-[#7366EE] bottom-0 left-0" width="64" height="57"/>
          </div>
        </div>
        <form @submit.prevent="submitData" enctype="multipart/form-data" class="mt-[1rem] flex flex-col justify-center items-center gap-3 ">
            <label class="custom-file-upload relative">
              <IconEdit class="absolute bottom-[2rem] right-[-9rem]" width="64" height="57"/>
              <input ref="uploadImag" type="file" multiple required />
              </label>
            <input type="Username" v-model="userName" :placeholder="userDetails.userName" class="rounded p-[0.5rem] px-1  bg-gray-200 focus:outline-none">
            <button type="submit"  class="bg-blue-600 p-[0.5rem] text-white text-[1.2rem] px-[2rem] rounded-lg">Save Edit</button>
         </form>
       </div>
      </div>
</template>

<script setup>
 import { ref } from 'vue';
import Header from '../components/Header.vue';
 import { IconShieldFilled,IconEdit } from '@tabler/icons-vue';
import axios from 'axios';
 
 const uploadImag = ref()
 const userName = ref()
 const userDetails = ref()



 const token = localStorage.getItem('token');

 if(token){
      const data = async()=>{
      await axios.get('http://localhost:8000/user', {
         headers: {
           Authorization: `Bearer ${token}`
           }
         })
         .then((res) => {
           userDetails.value = res.data.Profile;
           console.log(userDetails.value);
         })
         .catch((error) => {
           console.log(error);
         });
      }
      data()
   }

const submitData =async (e)=>{
  console.log(uploadImag.value)
  e.preventDefault();
  const data = new FormData()
  const file = uploadImag.value.files
  
  data.append('image',file);
  data.append('userName',userName.value);

  for(let i = 0; i < file.length; i++) { data.append('image', file[i])}



  if(token){
     await axios.get('http://localhost:8000/user', {
      headers: {
        Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        userDetails.value = res.data.Profile;
        console.log(userDetails);
      })
      .catch((error) => {
        console.log(error);
      });

    await axios.post('http://localhost:8000/update-user',data,{
      headers:{
        Authorization:`Bearer ${token}`
      },
     }).then(()=>{
      return  axios.get('http://localhost:8000/user',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
    }).then((res)=>{
      userDetails.value = res.data.Profile
      console.log(userDetails)
      window.location.reload();
    })
    .catch(error=>{
        console.log(error)
    })
  }
}



</script>

<style scoped>

input[type="file"] {
    display: none;
}

.custom-file-upload {
    display:flex;
    justify-content: center;
    align-items: center;
    
    padding: 0.5rem;
    cursor: pointer;
    margin-left:1.5rem ;
    margin-right: 1.5rem;
}


</style>