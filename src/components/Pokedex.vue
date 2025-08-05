<template>
  <div class="layout-container">
    <div :class="['main-content', { 'sidebar-open': selectedPokemon }]">

      <div class="controls">

      <img src="../assets/png-pokemon-logo.png" alt="Pokémon Logo" class="logo" />
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search Pokémon"
        />

        <select v-model="selectedType" >
          <option value="">All Types</option>
          <option v-for="type in availableTypes" :key="type" :value="type">
            {{ capitalize(type) }}
          </option>
        </select>
      </div>

      <div v-if="loading">Loading Pokémon...</div>

      <div v-else class="pokedex-grid">
        <div
          v-for="pokemon in filteredPokemons"
          :key="pokemon.id"
          class="pokemon-card"
          @click="selectPokemon(pokemon.name)"
        >
          <img :src="pokemon.sprite" :alt="pokemon.name" />
          <p>#{{ pokemon.id }} {{ capitalize(pokemon.name) }}</p>
          <p>Types: {{ pokemon.types.join(', ') }}</p>
        </div>
      </div>
    </div>

    <div :class="['sidebar', { 'sidebar-open': selectedPokemon }]" v-if="selectedPokemon">
      <PokemonSidebar :pokemon="selectedPokemon" @close="selectedPokemon = null" />
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import PokemonSidebar from './PokemonSidebar.vue'

const pokemons = ref([])
const loading = ref(true)
const searchQuery = ref('')
const selectedType = ref('')
const availableTypes = ref([])

const selectedPokemon = ref(null)

const API_URL = `${import.meta.env.VITE_API_URL}/api/pokemon`;
// Fetch the basic list of Pokémon (name, sprite, types)
const fetchPokemons = async () => {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    pokemons.value = data

    // Extract unique types for filter dropdown
    const typesSet = new Set()
    data.forEach(pokemon => {
      pokemon.types.forEach(type => typesSet.add(type))
    })
    availableTypes.value = Array.from(typesSet).sort()
  } catch (err) {
    console.error('Error fetching Pokémon:', err)
  } finally {
    loading.value = false
  }
}

// Fetch full details for selected Pokémon when clicked
async function selectPokemon(name) {
  const response = await fetch(`${API_URL}/${name}`);
  const data = await response.json();
  selectedPokemon.value = data;
}

const filteredPokemons = computed(() => {
  return pokemons.value.filter(pokemon => {
    const matchesName = pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesType = selectedType.value === '' || pokemon.types.includes(selectedType.value);
    return matchesName && matchesType;
  });
});


const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

onMounted(() => {
  fetchPokemons()
  
})
</script>


<style scoped>
.controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem;
  position: sticky;
  top: 0px;
  z-index: 10;
 background: #ffffff;
background: linear-gradient(179deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.5) 94%, rgba(255, 255, 255, 0) 100%);
padding-block: 50px;
}

.controls img {
  width: 200px;
  margin: 0 auto;
}

input[type="text"], select {
  margin: 0 auto;
  padding: 0.5rem;
  font-size: 1rem;
  width: 300px;
}

.pokedex-grid {
  width: 100%;          /* make sure it takes full available width */
  max-width: 900px;   /*limit max width for better readability */
  margin: 0 auto;       /* center horizontally */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
}


.pokemon-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  padding: 0.5rem;
  background: #f8f8f8;
  box-shadow: 0px 0px 1px 1px rgb(0 0 255 / 0.2);
  transition: transform 0.2s ease;
  cursor: pointer;
}

.pokemon-card:hover {
  transform: scale(1.01);
  box-shadow: 4px 4px 2px 1px rgb(0 0 255 / 0.2);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.layout-container {
  display: flex;
  transition: all 0.3s ease;
}

/* Main content flex-grow to fill space */
.main-content {
  flex-grow: 1;
  transition: margin-right 0.3s ease;
  overflow-y: scroll;
  height: 100vh
}

.main-content.sidebar-open {
 width: calc(100vw - 400px); /* Adjust width when sidebar is open */
}

/* Sidebar base styles */
.sidebar {
  background: #fff;
  box-shadow: -2px 0 5px rgba(0,0,0,0.1);
}

/* Push grid to the left when sidebar is open (Desktop) */
@media (min-width: 637px) {
.sidebar.sidebar-open {
  height: 100vh;
  transition: transform 0.3s ease;
  overflow-y: hidden;
  position: relative;
}

}

/* On mobile, sidebar overlays fullscreen */
@media (max-width: 636px) {
  .sidebar.sidebar-open {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    min-width: 100%;
    height: 100%;
    transform: translateX(0);
    z-index: 1000;
  }

  .layout-container.sidebar-open .main-content {
    margin-right: 0;
  }
}

.main-content {
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

/* For Chrome, Safari, and others */
.main-content::-webkit-scrollbar {
  display: none;
}
</style>