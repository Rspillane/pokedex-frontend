const props = defineProps({
    pokemon: Object
});
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['close-button']} */ ;
/** @type {__VLS_StyleScopedClasses['pokemon-details']} */ ;
/** @type {__VLS_StyleScopedClasses['evolution-chain']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "sidebar-container" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('close');
            // @ts-ignore
            [$emit,];
        } },
    ...{ class: "close-button" },
});
if (__VLS_ctx.pokemon) {
    // @ts-ignore
    [pokemon,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "pokemon-details" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({});
    (__VLS_ctx.capitalize(__VLS_ctx.pokemon.name));
    // @ts-ignore
    [pokemon, capitalize,];
    __VLS_asFunctionalElement(__VLS_elements.img)({
        src: (__VLS_ctx.pokemon.sprites),
        alt: (__VLS_ctx.pokemon.name),
    });
    // @ts-ignore
    [pokemon, pokemon,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "info-grid" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
    __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
    (__VLS_ctx.pokemon.height);
    // @ts-ignore
    [pokemon,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
    __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
    (__VLS_ctx.pokemon.weight);
    // @ts-ignore
    [pokemon,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
    __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
    (__VLS_ctx.capitalize(__VLS_ctx.pokemon.habitat));
    // @ts-ignore
    [pokemon, capitalize,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
    __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
    (__VLS_ctx.pokemon.types.join(', '));
    // @ts-ignore
    [pokemon,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "evolution-chain" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({});
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
    (__VLS_ctx.pokemon.evolutionChain.join(' → '));
    // @ts-ignore
    [pokemon,];
}
/** @type {__VLS_StyleScopedClasses['sidebar-container']} */ ;
/** @type {__VLS_StyleScopedClasses['close-button']} */ ;
/** @type {__VLS_StyleScopedClasses['pokemon-details']} */ ;
/** @type {__VLS_StyleScopedClasses['info-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['evolution-chain']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
            capitalize: capitalize,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        const __VLS_returns = {
            $props: __VLS_makeOptional(props),
            ...props,
        };
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
