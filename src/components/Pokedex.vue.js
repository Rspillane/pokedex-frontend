import { ref, computed, onMounted } from 'vue';
import PokemonSidebar from './PokemonSidebar.vue';
const pokemons = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const selectedType = ref('');
const availableTypes = ref([]);
const selectedPokemon = ref(null);
const API_URL = `${import.meta.env.VITE_API_URL}/api/pokemon`;
// Fetch the basic list of Pokémon (name, sprite, types)
const fetchPokemons = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        pokemons.value = data;
        // Extract unique types for filter dropdown
        const typesSet = new Set();
        data.forEach(pokemon => {
            pokemon.types.forEach(type => typesSet.add(type));
        });
        availableTypes.value = Array.from(typesSet).sort();
    }
    catch (err) {
        console.error('Error fetching Pokémon:', err);
    }
    finally {
        loading.value = false;
    }
};
// Fetch full details for selected Pokémon when clicked
async function selectPokemon(name) {
    const response = await fetch(`${API_URL}${name}`);
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
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
onMounted(() => {
    fetchPokemons();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['controls']} */ ;
/** @type {__VLS_StyleScopedClasses['pokemon-card']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-open']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-open']} */ ;
/** @type {__VLS_StyleScopedClasses['layout-container']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-open']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "layout-container" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: (['main-content', { 'sidebar-open': __VLS_ctx.selectedPokemon }]) },
});
// @ts-ignore
[selectedPokemon,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "controls" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "../assets/png-pokemon-logo.png",
    alt: "Pokémon Logo",
    ...{ class: "logo" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: "text",
    value: (__VLS_ctx.searchQuery),
    placeholder: "Search Pokémon",
});
// @ts-ignore
[searchQuery,];
__VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
    value: (__VLS_ctx.selectedType),
});
// @ts-ignore
[selectedType,];
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "",
});
for (const [type] of __VLS_getVForSourceType((__VLS_ctx.availableTypes))) {
    // @ts-ignore
    [availableTypes,];
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        key: (type),
        value: (type),
    });
    (__VLS_ctx.capitalize(type));
    // @ts-ignore
    [capitalize,];
}
if (__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "pokedex-grid" },
    });
    for (const [pokemon] of __VLS_getVForSourceType((__VLS_ctx.filteredPokemons))) {
        // @ts-ignore
        [filteredPokemons,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    __VLS_ctx.selectPokemon(pokemon.name);
                    // @ts-ignore
                    [selectPokemon,];
                } },
            key: (pokemon.id),
            ...{ class: "pokemon-card" },
        });
        __VLS_asFunctionalElement(__VLS_elements.img)({
            src: (pokemon.sprite),
            alt: (pokemon.name),
        });
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
        (pokemon.id);
        (__VLS_ctx.capitalize(pokemon.name));
        // @ts-ignore
        [capitalize,];
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
        (pokemon.types.join(', '));
    }
}
if (__VLS_ctx.selectedPokemon) {
    // @ts-ignore
    [selectedPokemon,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: (['sidebar', { 'sidebar-open': __VLS_ctx.selectedPokemon }]) },
    });
    // @ts-ignore
    [selectedPokemon,];
    /** @type {[typeof PokemonSidebar, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(PokemonSidebar, new PokemonSidebar({
        ...{ 'onClose': {} },
        pokemon: (__VLS_ctx.selectedPokemon),
    }));
    const __VLS_1 = __VLS_0({
        ...{ 'onClose': {} },
        pokemon: (__VLS_ctx.selectedPokemon),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_3;
    let __VLS_4;
    const __VLS_5 = ({ close: {} },
        { onClose: (...[$event]) => {
                if (!(__VLS_ctx.selectedPokemon))
                    return;
                __VLS_ctx.selectedPokemon = null;
                // @ts-ignore
                [selectedPokemon, selectedPokemon,];
            } });
    var __VLS_2;
}
/** @type {__VLS_StyleScopedClasses['layout-container']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-open']} */ ;
/** @type {__VLS_StyleScopedClasses['controls']} */ ;
/** @type {__VLS_StyleScopedClasses['logo']} */ ;
/** @type {__VLS_StyleScopedClasses['pokedex-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['pokemon-card']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-open']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            PokemonSidebar: PokemonSidebar,
            loading: loading,
            searchQuery: searchQuery,
            selectedType: selectedType,
            availableTypes: availableTypes,
            selectedPokemon: selectedPokemon,
            selectPokemon: selectPokemon,
            filteredPokemons: filteredPokemons,
            capitalize: capitalize,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        const __VLS_returns = {};
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
