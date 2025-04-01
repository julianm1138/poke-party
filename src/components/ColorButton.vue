<script setup lang="ts">
import { usePokemonStore } from "../store";
const allColorValues = 16777215;
const globalStore = usePokemonStore();

const generateRandomColor = () => {
  const randomColor = `#${Math.floor(Math.random() * allColorValues).toString(
    16
  )}`;
  globalStore.setBackgroundColor(randomColor);
};
</script>

<template>
  <button
    @click="generateRandomColor"
    class="text-white text-xs sm:w-[160px] lg:text-md lg:w-[180px] tracking-widest bg-gray-700 h-[27px] w-[174px] p-[4px] border-black border-[3px] rounded-full cursor-pointer"
  >
    Change color scheme
  </button>
</template>
