<template>
     <div class="flex items-center gap-3  rounded hover:bg-slate-300 mb-[0.5rem]">
                    <img class="w-16 h-16 rounded aspect-square object-cover" :src="`http://localhost:8000/images/${props.item.images[0].url}`" alt="">
                    <div class="flex flex-col gap-2 ">
                        <div class="flex items-center gap-[6rem] justify-between">
                          <h2>{{props.item.name }}</h2>
                          <p>${{ props.item.priceOfHouse }}</p>
                        </div>
                        <!--Icons Rooms-->
                        <div class="flex  items-center justify-between gap-2">
                          <p class="flex gap-2 justify-center items-center text-[13px]"><IconBedFilled/>{{props.item.numberOfRooms}}rooms</p>
                          <p class="flex text-[13px]  gap-2 "><span><IconRuler2/></span>Size : {{props.item.size}}  sq/f</p>
                    </div>
               </div>
        </div>
</template>

<script setup>

const props = defineProps({
    item:Array
})

</script>