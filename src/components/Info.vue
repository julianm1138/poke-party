<script setup lang="ts">
import { usePokemonStore } from "../store";
import _ from "lodash";
import { create, all } from "mathjs";
const math = create(all);

const globalStore = usePokemonStore();
</script>

<template>
  <div
    :style="{ backgroundColor: globalStore.color, opacity: 1 }"
    class="z-10 flex flex-col items-center text-white h-[400px] w-[320px] sm:h-[350px] sm:w-[250px] lg:w-[490px] lg:h-[605px] py-5 absolute right-[-7px] top-[132%] sm:right-[204%] sm:top-[1%] md:translate-x-[100px] lg:top-[2px] lg:right-[1007px] lg:translate-x-[0px] font-extrabold rounded-md tracking-widest"
  >
    <h1 class="text-3xl font-bold mt-1 lg:text-5xl">
      {{ _.startCase(globalStore.currentPokemon?.name || "Unknown Pokémon") }}
    </h1>
    <img
      v-if="globalStore.currentPokemon?.sprites?.front_default"
      :src="globalStore.currentPokemon.sprites.front_default"
      alt="pokemon sprite"
      class="h-[120px] w-[125px] lg:h-[240px] lg:w-[240px]"
    />
    <div
      class="flex flex-row items-start gap-8 px-4 text-[11px] text-base/8 sm:text-base/7 sm:gap-4 sm:text-[8px] lg:text-[14px] lg:gap-20 lg:text-base/11"
    >
      <div
        v-if="globalStore.currentPokemon?.types"
        class="flex flex-col items-start"
      >
        <span
          >Type:
          {{
            _.startCase(globalStore.currentPokemon.types[0]?.type?.name)
          }}</span
        >
        <span
          >Height:
          {{
            math.unit(globalStore.currentPokemon?.height, "m").to("m")
          }}eters</span
        >
        <span
          >Weight:
          {{
            math.format(
              math.unit(globalStore.currentPokemon?.weight, "hg").to("kg"),
              { notation: "fixed", precision: 1 }
            )
          }}</span
        >
      </div>

      <div
        v-if="globalStore.currentPokemon?.stats"
        class="flex flex-col items-start"
      >
        <div
          v-for="(stat, index) in globalStore.currentPokemon.stats"
          :key="index"
        >
          <span>{{ _.startCase(stat.stat.name) }}: {{ stat.base_stat }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
