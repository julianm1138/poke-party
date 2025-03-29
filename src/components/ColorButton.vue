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
    class="text-white text-md tracking-widest bg-gray-700 w-[220px] p-[5px] border-black border-[2px] rounded-full cursor-pointer"
  >
    Change color scheme
  </button>
</template>
