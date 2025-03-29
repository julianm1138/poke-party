<script setup lang="ts">
import { ref } from "vue";
import { usePokemonStore } from "../store";
// import Card from "./Card.vue";
import Info from "./Info.vue";

const globalStore = usePokemonStore();

const hoveredIndex = ref<number | null>(null);

const removeFromParty = (index: number) => {
  globalStore.party[index] = null;
};
</script>

<template>
  <div class="grid grid-cols-2 grid-rows-3 gap-2 h-[550px] w-[400px]">
    <div
      v-for="(sprite, index) in globalStore.party"
      :key="index"
      class="flex flex-col items-center text-center justify-center p-4 border border-black rounded-lg opacity-100 hover:opacity-90"
      :style="{
        backgroundColor: globalStore.color,
        height: '180px',
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
        class="h-[120px] w-[120px] animate-custom-bounce"
        :style="{
          animationDelay: `${index * 0.2}s`,
        }"
      />

      <Info v-if="hoveredIndex !== null && hoveredIndex === index && sprite" />
      <button
        v-show="sprite && hoveredIndex === index"
        @click="removeFromParty(index)"
        class="text-gray-200 cursor-pointer"
      >
        Remove
      </button>
    </div>

    <button
      v-if="globalStore.party.filter((pokemon) => pokemon).length > 0"
      @click="globalStore.clearParty()"
      class="text-white text-sm bg-opacity-10 absolute top-[530px] right-[439px] w-[130px] p-[10px] border-black border-[5px] rounded-full bg-gray-700 tracking-widest cursor-pointer"
    >
      Clear Party
    </button>
  </div>
</template>
