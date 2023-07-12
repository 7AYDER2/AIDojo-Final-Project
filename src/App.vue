<template>

  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component"/> 
    </transition>
  </router-view>
</template>

<script setup>
import { RouterView } from 'vue-router';

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
