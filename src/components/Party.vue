<script setup lang="ts">
import { ref } from "vue";
import { usePokemonStore } from "../store";
import Info from "./Info.vue";

const globalStore = usePokemonStore();

const hoveredIndex = ref<number | null>(null);

const removeFromParty = (index: number) => {
  globalStore.party[index] = null;
};
</script>

<template>
  <div
    class="grid grid-cols-3 grid-rows-2 sm:grid sm:grid-cols-2 sm:w-[35vw] md:grid md:grid-cols-3 lg:grid lg:grid-cols-2 lg:w-[30vw] gap-1 w-[80vw]"
  >
    <div
      v-for="(sprite, index) in globalStore.party"
      :key="index"
      class="flex flex-col items-center text-center justify-center p-4 border border-black rounded-lg opacity-100 hover:opacity-90"
      :style="{
        backgroundColor: globalStore.color,
      }"
      :class="{
        'h-[90px]': true,
        'sm:h-[80px]': true,
        'md:h-[100px]': true,
        'lg:h-[200px]': true,
      }"
      @mouseover="
        if (globalStore.party[index]?.name) {
          hoveredIndex = index;
          globalStore.fetchPokemonData(globalStore.party[index].name);
        }
      "
      @mouseleave="
        hoveredIndex = null;
        globalStore.clearPokemonData();
      "
      @focus="
        if (globalStore.party[index]?.name) {
          hoveredIndex = index;
          !globalStore.currentPokemon &&
            globalStore.fetchPokemonData(globalStore.party[index].name);
        }
      "
      @blur="
        hoveredIndex = null;
        globalStore.clearPokemonData();
      "
      tabindex="0"
    >
      <img
        v-if="sprite"
        :src="globalStore.party[index].spriteUrl"
        class="h-[120px] w-[120px] sm:h-[90px] sm:w-[95px] lg:h-[150px] lg:w-[150px] animate-custom-bounce"
        :style="{
          animationDelay: `${index * 0.2}s`,
        }"
      />

      <Info v-if="hoveredIndex !== null && hoveredIndex === index && sprite" />
      <button
        v-show="sprite && hoveredIndex === index"
        @click="removeFromParty(index)"
        class="text-gray-200 text-[12px] cursor-pointer z-10"
      >
        Remove
      </button>
    </div>

    <button
      v-if="globalStore.party.filter((pokemon) => pokemon).length > 0"
      @click="globalStore.clearParty()"
      class="text-white text-xs bg-opacity-10 absolute h-[27px] top-[101.5%] sm:top-[105%] sm:right-[0%] sm:w-[90px] w-[110px] border-black border-[3px] rounded-full bg-gray-700 tracking-widest cursor-pointer"
    >
      Clear Party
    </button>
  </div>
</template>
