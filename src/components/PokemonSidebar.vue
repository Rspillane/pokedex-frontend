<template>
  <div class="sidebar-container">
    <button class="close-button" @click="$emit('close')">✖</button>

    <div v-if="pokemon" class="pokemon-details">
      <h2>{{ capitalize(pokemon.name) }}</h2>
      <img :src="pokemon.sprite" :alt="pokemon.name" />

      <div class="info-grid">
        <p><strong>Height:</strong> {{ pokemon.height }} m</p>
        <p><strong>Weight:</strong> {{ pokemon.weight }} kg</p>
        <!-- <p><strong>Habitat:</strong> {{ capitalize(pokemon.habitat) }}</p> -->
        <p><strong>Types:</strong> {{ pokemon.types.join(', ') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  pokemon: Object
})

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
</script>

<style scoped>
.sidebar-container {
  position: relative;
  padding: 1.5rem;
  height: 100%;
  width: 400px;
  overflow-y: auto;
  background: #f9f9f9;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #888;
  transition: color 0.2s;
}
.close-button:hover {
  color: #333;
}

.pokemon-details {
  margin-top: 2rem;
  text-align: center;
}

.pokemon-details img {
  width: 200px;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #333;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  text-align: left;
  margin: 1rem 0;
}


.hidden-tag {
  font-size: 0.85rem;
  color: #888;
}

.evolution-chain {
  margin-top: 1.5rem;
  text-align: left;
}
.evolution-chain h3 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: #555;
}
</style>
