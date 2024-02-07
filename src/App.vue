<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue'
import Modal from './components/Modal.vue'
</script>

<template>
 <Header></Header>
 <main class="container mx-auto mt-10">
  <RouterView></RouterView>
 </main>
 <Modal></Modal>
</template>

<style scoped>

</style>
