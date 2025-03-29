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
      class="text-8xl text-gray-200 font-semibold tracking-wider absolute bottom-[65%]"
    >
      PokéParty
    </h1>

    <button
      @click="
        flashBtn();
        handleGo();
      "
      :class="{ 'animate-flash': isFlashing }"
      class="text-3xl font-extrabold tracking-widest justify-center absolute left-[724px] bottom-[290px] items-center text-gray-200 rounded-full w-[110px] h-[110px] cursor-pointer"
    >
      Go!
    </button>
  </div>
  <div class="absolute top-[65%] right-[40%]">
    <Search ref="searchRef" />
  </div>
  <Party class="absolute top-[14%] right-[3%]" />
  <ColorButton
    @changeColor="handleColorChange"
    class="absolute top-[5%] right-[9%]"
  />
</template>
<style></style>
