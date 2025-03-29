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
    class="flex flex-col items-center text-white h-[560px] w-[450px] bg-[#500020] py-4 absolute -top-[2%] right-[63rem] font-extrabold rounded-md tracking-widest"
  >
    <h1 class="text-5xl font-bold mt-5">
      {{ _.startCase(globalStore.currentPokemon?.name || "Unknown Pokémon") }}
    </h1>
    <img
      v-if="globalStore.currentPokemon?.sprites?.front_default"
      :src="globalStore.currentPokemon.sprites.front_default"
      alt="pokemon sprite"
      class="h-[270px] w-[270px]"
    />
    <div class="flex flex-row gap-12 mt-5">
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
