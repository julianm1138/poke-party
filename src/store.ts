import { defineStore } from "pinia";
import axios from "axios";
const pokemonCache = new Map<string, any>();
export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    color: "#800020",
    party: Array(6).fill(null),
    currentPokemon: null as any,
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    setBackgroundColor(newColor: string) {
      this.color = newColor;
    },

    addSpriteToParty(spriteUrl: string, pokemonName: string) {
      const emptySlotIndex = this.party.indexOf(null);
      if (emptySlotIndex !== -1) {
        this.party[emptySlotIndex] = { spriteUrl, name: pokemonName };
      } else {
        alert("Party is full!");
      }
    },
    removeSpriteFromParty(index: number) {
      this.party = this.party.filter((_, i) => i !== index);
    },

    clearParty() {
      this.party = Array(6).fill(null);
    },

    async fetchPokemonData(pokemonName: string) {
      this.isLoading = true;
      if (pokemonCache.has(pokemonName.toLowerCase())) {
        this.currentPokemon = pokemonCache.get(pokemonName.toLowerCase());
        return;
      }
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
        );
        this.currentPokemon = response.data;

        pokemonCache.set(pokemonName.toLowerCase(), response.data);
      } catch (error) {
        this.error = "Error fetching Pokémon data";
        console.error("error", error);
      }
      this.isLoading = false;
      console.log("Fetched Data:", this.currentPokemon);
    },

    clearPokemonData() {
      this.currentPokemon = null;
    },
  },
});
