<script setup>
import { useBebidasStore } from '@/stores/bebidas';

const bebidas = useBebidasStore()
</script>

<template>
    <h1 class="text-6xl font-extrabold">Recetas</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 2x1:grid-cols-3 mt-10 gap-10"
    v-for="bebida in bebidas">{{bebida}}</div>
</template>

