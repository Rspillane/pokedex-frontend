<template>
  <div class="layout-container">
    <div :class="['main-content', { 'sidebar-open': selectedPokemon }]">

      <!-- Controls -->
      <div class="controls">
        <div class="pagination">
          <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">Prev</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">Next</button>
        </div>

        <img src="../assets/png-pokemon-logo.png" alt="Pokémon Logo" class="logo" />

        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search Pokémon"
        />

        <select v-model="selectedType">
          <option value="">All Types</option>
          <option v-for="type in availableTypes" :key="type" :value="type">
            {{ capitalize(type) }}
          </option>
        </select>
      </div>

      <!-- Loading -->
      <div v-if="loading">Loading Pokémon...</div>

      <!-- Pokémon Grid -->
      <div v-else class="pokedex-grid">
        <div
          v-for="pokemon in paginatedPokemons"
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

    <!-- Sidebar -->
    <div :class="['sidebar', { 'sidebar-open': selectedPokemon }]" v-if="selectedPokemon">
      <PokemonSidebar :pokemon="selectedPokemon" @close="selectedPokemon = null" />
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import PokemonSidebar from './PokemonSidebar.vue'

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

const allPokemons = ref([])
const searchQuery = ref('')
const selectedType = ref('')
const currentPage = ref(1)
const limit = 25
const loading = ref(true)
const selectedPokemon = ref(null)


const availableTypes = computed(() => {
  const typesSet = new Set()
  allPokemons.value.forEach(p => {
    p.types.forEach(t => typesSet.add(t))
  })
  return Array.from(typesSet).sort()
})


// Filter allPokemons (no slicing yet)
const filteredAllPokemons = computed(() => {
  return allPokemons.value.filter(pokemon => {
    const matchesName = pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesType = selectedType.value === '' || pokemon.types.includes(selectedType.value)
    return matchesName && matchesType
  })
})

// Slice only for the visible page
const paginatedPokemons = computed(() => {
  const start = (currentPage.value - 1) * limit
  const end = currentPage.value * limit
  return filteredAllPokemons.value.slice(start, end)
})

// Correct totalPages — use full filtered list length
const totalPages = computed(() => {
  return Math.ceil(filteredAllPokemons.value.length / limit)
})

const API_URL = import.meta.env.VITE_API_URL

// Fetch all Pokémon from backend
const fetchPokemons = async () => {
  loading.value = true
  try {
    const response = await fetch(`${API_URL}/api/pokemon`)
    const data = await response.json()

    // ✅ If backend returns { results: [...], total: 150 }
    if (data.results) {
      allPokemons.value = data.results
    } else {
      // ✅ If backend just returns an array
      allPokemons.value = data
    }
  } catch (err) {
    console.error('Error fetching Pokémon:', err)
  } finally {
    loading.value = false
  }
}

function changePage(newPage) {
  if (newPage >= 1 && newPage <= totalPages.value) {
    currentPage.value = newPage
  }
}

async function selectPokemon(name) {
  try {
    const res = await fetch(`${API_URL}/api/pokemon/${name}`)
    const data = await res.json()
    selectedPokemon.value = data
  } catch (err) {
    console.error('Error fetching details:', err)
  }
}


onMounted(fetchPokemons)
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