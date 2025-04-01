<script setup lang="ts">
import axios from "axios";
import { usePokemonStore } from "../store";
import { ref, watch, onMounted } from "vue";
import debounce from "lodash/debounce";
import _ from "lodash";

const globalStore = usePokemonStore();
const searchQuery = ref<string>("");
const suggestions = ref<string[]>([]);
const allPokemon = ref<{ name: string }[]>([]);
const pokemonSprite = ref<string | null>(null);
const isManualSelection = ref<boolean>(false);
const selectedPokemon = ref<string | null>("");
const isButtonHidden = ref<boolean>(true);

const addSpriteToParty = () => {
  if (pokemonSprite.value) {
    globalStore.addSpriteToParty(pokemonSprite.value, searchQuery.value);
    console.log(usePokemonStore().party);
  }
  isButtonHidden.value = true;
};

const hideDropdown = () => {
  suggestions.value = [];
};

const showAddButton = () => {
  if (searchQuery.value) isButtonHidden.value = false;
};

onMounted(async () => {
  //Make API call once on mount
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=1000`
    );
    allPokemon.value = response.data.results;
  } catch (error) {
    console.log("error fetching data", error);
  }
});

const fetchSuggestions = debounce(() => {
  if (!searchQuery.value.trim()) {
    suggestions.value = [];
    return;
  }

  if (isManualSelection.value) {
    isManualSelection.value = false;
    return;
  }

  suggestions.value = allPokemon.value
    .filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchQuery.value.toLowerCase())
    )
    .map((pokemon) => pokemon.name);
}, 300);

const fetchPokemonData = async (pokemonName: string) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const pokemon = response.data;

    pokemonSprite.value = pokemon.sprites.front_default;
  } catch (error) {
    console.log(error);
  }
};

const handleSelect = (name: string) => {
  searchQuery.value = _.capitalize(name);
  selectedPokemon.value = name;
  isManualSelection.value = true;
  hideDropdown();
};

defineExpose({ fetchPokemonData, searchQuery, showAddButton });
watch(searchQuery, fetchSuggestions);
</script>

<template>
  <div
    class="flex flex-col justify-center items-center gap-4 text-lg tracking-widest"
  >
    <input
      class="text-white bg-gray bg-opacity-10 w-[120%] sm:w-[100%] lg:w-[340px] lg:-translate-x-[148px] p-[10px] border-black border-[5px] rounded-full bg-gray-700 tracking-widest"
      type="text"
      aria-label="Enter Pokémon name into the search bar"
      v-model="searchQuery"
      id="pokemonName"
      placeholder="Enter Pokémon name"
      autocomplete="off"
      spellcheck="false"
    />
    <div
      class="flex flex-col absolute -translate-y-[-69px] -translate-x-[5px] sm:left-[26%]"
    >
      <img
        class="flex justify-center h-[130px] w-[130px] sm:h-[100px] sm:w-[110px] lg:w-[170px] lg:h-[170px] lg:-translate-x-[145px] sm:mt-5 animate-custom-bounce"
        v-if="pokemonSprite"
        :src="pokemonSprite"
        alt="Pokemon sprite"
      />
    </div>
    <button
      class="text-white text-sm bg-opacity-10 absolute top-[180px] left-[auto] sm:top-[45px] sm:right-[-90px] sm:-translate-y-[-42px] lg:-translate-y-[-95px] lg:-translate-x-[180px] w-[130px] p-[10px] border-black border-[5px] rounded-full bg-gray-700 tracking-widest cursor-pointer"
      @click="addSpriteToParty"
      v-if="!isButtonHidden"
    >
      Add to Party
    </button>
  </div>

  <ul
    v-if="suggestions.length"
    :style="{ backgroundColor: globalStore.color, opacity: 0.8 }"
    class="fixed max-h-[150px] text-xl overflow-y-auto text-gray-100 rounded-lg shadow-lg mt-2 w-[230px] lg:w-[338px] lg:right-[145px] tracking-widest"
  >
    <li
      v-for="(suggestion, index) in suggestions"
      :key="index"
      class="p-2 hover:bg-gray-700 cursor-pointer capitalize"
      @click="handleSelect(suggestion)"
      tabindex="0"
      @keydown.enter="handleSelect(suggestion)"
    >
      {{ suggestion }}
    </li>
  </ul>
</template>
