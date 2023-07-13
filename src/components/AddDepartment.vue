<template>
    <transition name="fade" mode="out-in">
          <form @submit.prevent="submitData" class="w-[36rem] rounded relative mt-[3rem] " enctype="multipart/form-data">
            <div class="flex justify-between items-center">
                <h1 class="text-blue-600 font-bold text-[1.7rem] p-[1.5rem]">Add New Department</h1>
            </div>
            <label class="custom-file-upload flex flex-col gap-2">
                <IconUpload/>
                  upload images
                <input 
                ref="onFileChange"
                type="file"
                required
                multiple/>
            </label>
            <div class="h-[0.1rem] bg-slate-300 mt-6 mx-[1.5rem] relative">
                <h3 class="bg-white text-slate-500 absolute top-[-0.7rem] left-[50%] translate-x-[-50%] px-[1rem]">General Details</h3>
            </div>
            <div class="flex items-center flex-wrap w-[100%] mx-[1.5rem] mt-6 gap-5">
                <input class="rounded p-[0.5rem] px-1  bg-gray-200 focus:outline-none"
                  v-model="houseZoneName"
                  type="text" placeholder="Owner of house" required>
                <input class="rounded p-[0.5rem] px-1  bg-gray-200 focus:outline-none" 
                  v-model="numberRooms"
                 type="text" placeholder="Numbers of room" required>
                <input class="rounded p-[0.5rem] px-1  bg-gray-200 focus:outline-none" 
                  v-model="deptSize"
                  @input="debounceData"
                type="text" placeholder="Size of dept" required>
                <input class="rounded p-[0.5rem] px-1  bg-gray-200 focus:outline-none" type="text"
                v-model="addRESS"
                placeholder="ADDRESS" required maxlength="15">
            </div>
            <textarea v-model="desc" class="mt-6 p-[1rem] w-[92%] mx-[1.5rem]  bg-gray-200 focus:outline-none h-[100px]" name="" id="" cols="30" rows="10" placeholder="Descripton" required></textarea>
                <div class="flex items-center">
                  <input class="mx-[1.5rem] mt-6 rounded p-[0.5rem] px-1  bg-gray-200 focus:outline-none"
                   v-model="priceHouse"
                   type="text" placeholder="price of house" required>
                  <p v-if="estimatePrice != null" class="text-red-400 mt-[1.3rem] ">estimate price :<br/> <span>{{ estimatePrice }}$</span></p>
                </div>
            <div class="h-[0.1rem] bg-slate-300 mt-6 mx-[1.5rem] relative">
                <h3 class="bg-white text-slate-500 absolute top-[-0.7rem] left-[50%] translate-x-[-50%] px-[1rem]">Contact Us</h3>
            </div>
            <div class="flex items-center flex-wrap w-[100%] mx-[1.5rem] mt-[2.7rem] mb-[1rem] gap-5">
                <input class="rounded p-[0.5rem] px-1  bg-gray-200 focus:outline-none" type="text" 
                v-model="PhoneNumber"
                placeholder="Phone Number"
                required>
                <div class="relative ">
                    <p class="absolute  bottom-[2.5rem] text-red-500 text-[0.8rem]">*Optional</p>
                    <input 
                      class="rounded p-[0.5rem] px-1  bg-gray-200 focus:outline-none" 
                      type="text"
                      v-model="emailOptional"
                      placeholder="Email"/>
                </div>
            </div>
            <button type="submit" class="bg-blue-600 p-[0.5rem] text-white text-[1.2rem] px-[2rem] absolute right-[1rem] ">Post</button>
              <transition name="fade" mode="out-in">
                <p v-if="isSuccses" class="absolute left-[50%] translate-x-[-50%] top-[-1rem] bg-green-500 p-2 px-[2.5rem] text-white rounded">Successfully</p>
              </transition>
          </form>
    </transition>
</template>

<script setup>
 import { computed, ref } from 'vue';
 import { IconUpload } from '@tabler/icons-vue';
import axios from 'axios';
import {debounce} from "lodash";


const onFileChange = ref();
const houseZoneName = ref();
const numberRooms =ref();
const deptSize = ref();
const desc = ref();
const priceHouse = ref();
const addRESS = ref();
const PhoneNumber =ref();
const emailOptional =ref();
const isSuccses = ref(false);
const estimatePrice = ref()


const messageSucssfuly = ()=>{
  isSuccses.value =true
  setTimeout(()=>{
    isSuccses.value = false
  },2000)
   onFileChange.value = "";
   houseZoneName.value = "";
   numberRooms.value = "";
   deptSize.value = "";
   desc.value = "";
   priceHouse.value = "";
   addRESS.value = "";
   PhoneNumber.value = "";
   emailOptional.value = "";
}


const normalize = (tensor) => {
  const numericTensor = tf.cast(tensor, 'float32'); // Cast the tensor to float32 data type
    const min = tf.min(numericTensor, 0);
    const max = tf.max(numericTensor, 0);
    const range = tf.sub(max, min);
    // tensor - min
    const tensorMinusMin = tf.sub(tensor, min);
    const normalizedValue = tf.div(tensorMinusMin, range);
    return normalizedValue
}

const checking = async() => {
      // load the model after extract ass json file
    let model = await tf.loadLayersModel('../../public/model/model.json');

    // input value to ai 
    let newValue = tf.tensor2d([[parseFloat(deptSize.value), parseFloat(numberRooms.value)]]);

    // normalize the input
    let normalizedValue = normalize(newValue);

    let output = model.predict(normalizedValue);
    output.print();

    const arrayBatch = await output.array()
    console.log(arrayBatch)
    estimatePrice.value = arrayBatch[0][0]
}

const debounceData = debounce(checking,3000)

const submitData =(e)=>{
    e.preventDefault();
    const data = new FormData()
    const files = onFileChange.value.files

    data.append('name',houseZoneName.value);
    data.append('numberOfRooms',numberRooms.value);
    data.append('size',deptSize.value);
    data.append('descriptions',desc.value);
    data.append('priceOfHouse',priceHouse.value);
    data.append('address',addRESS.value);
    data.append('phoneNumber',PhoneNumber.value);
    data.append('email',emailOptional.value);
    data.append('image',files)

      for(let i = 0; i < files.length; i++) {
        data.append('image', files[i]);
        }

      const token = localStorage.getItem('token')

      if(token){
       axios.post('http://localhost:8000/add-house',data,{
        headers:{
          Authorization:`Bearer ${token}`
        },
      }).then((res)=>{
           if(res.status === 200) {
            messageSucssfuly()
           }
      })
      .catch(error=>{
        console.log(error)
      })
    }
}


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

input[type="file"] {
    display: none;
}

.custom-file-upload {
    border: 1px solid #ccc;
    background: rgba(128, 128, 128, 0.387);
    color: royalblue;
    display:flex;
    justify-content: center;
    align-items: center;
    height: 9rem;
    padding: 1rem;
    cursor: pointer;
    margin-left:1.5rem ;
    margin-right: 1.5rem;
    border-radius:0.5rem ;
}




</style>

