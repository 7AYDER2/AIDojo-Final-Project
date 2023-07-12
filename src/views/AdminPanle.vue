<template>
    <div class="bg-white lg:h-[100vh] sm:h-[145vh]">
        <Header/>
        <div class="flex justify-center items-center sm:px-[1rem] md:px-[5rem]">
            <AddDepartment />
        </div>
    </div>
 
</template>

<script setup>
import AddDepartment from '@/components/AddDepartment.vue';
import Header from '@/components/Header.vue';
import Card from '@/components/Card.vue';







//Garbage way

// if (token) {
//     axios.get('http://localhost:8000/user', {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     })
//         .then(res => {
//             const role = res.data.Profile.role;
//             console.log(role)
//             if (role != 'admin') {
//                 this.$router.push('/');
//             }
//         })
//         .catch(error => {
//             console.log(error);

//        });
// }
</script>


<style scoped>
  </style>
