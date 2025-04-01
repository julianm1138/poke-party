<script setup lang="ts">
import Search from "./components/Search.vue";
import Party from "./components/Party.vue";
import ColorButton from "./components/ColorButton.vue";
import { ref } from "vue";
import { usePokemonStore } from "./store";

const isFlashing = ref(false);
const searchRef = ref<InstanceType<typeof Search> | null>(null); //exposed from Search.vue
const backgroundColorStore = usePokemonStore();

const handleGo = () => {
  const searchComponent = searchRef.value;
  if (searchComponent && searchComponent.searchQuery) {
    //this is from Search.vue
    searchComponent.fetchPokemonData(searchComponent.searchQuery);
  }

  searchRef.value?.showAddButton();
};

const handleColorChange = (newColor: string) => {
  backgroundColorStore.setBackgroundColor(newColor);
};

const flashBtn = () => {
  isFlashing.value = false;
  setTimeout(() => {
    isFlashing.value = true;
    setTimeout(() => {
      isFlashing.value = false;
    }, 800);
  }, 10);
};
</script>

<template class="relative">
  <div
    class="min-h-screen bg-cover bg-center relative flex flex-col justify-center items-center"
    style="background-image: url('/background-img.jpeg')"
  >
    <h1
      class="text-4xl text-gray-200 font-semibold tracking-wider transform -translate-x-1/2 -translate-y-1/2 absolute bottom-[53%] left-[51%] lg:text-8xl"
    >
      PokéParty
    </h1>
    <button
      @click="
        flashBtn();
        handleGo();
      "
      :class="{ 'animate-flash': isFlashing }"
      class="text-xl font-extrabold tracking-widest justify-center items-center absolute left-1/2 top-1/2 transform -translate-x-[39%] -translate-y-[44%] sm:-translate-x-[36%] sm:-translate-y-[49%] md:-translate-x-[26%] md:-translate-y-[49%] lg:-translate-x-[39%] lg:-translate-y-[46%] text-gray-200 rounded-full w-[70px] h-[70px] cursor-pointer sm:w-[40px] sm:h-[40px] sm:text-xl lg:text-3xl lg:h-[110px] lg:w-[109px]"
    >
      Go!
    </button>
  </div>
  <div
    class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-[-70px] sm:-translate-y-[-25px] lg:-translate-y-[-80px] lg:-translate-x-[16px]"
  >
    <Search ref="searchRef" />
  </div>
  <div class="absolute top-[2%] right-[10%] sm:right-[1%]">
    <Party />
  </div>
  <ColorButton
    @changeColor="handleColorChange"
    class="absolute transform -translate-x-1/2 -translate-y-1/2 top-[213.5px] right-[-13%] sm:right-[26%] sm:top-[4%]"
  />
</template>
<style></style>
