<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import FooterBar from './components/FooterBar.vue';
</script>

<template>
  <NavBar />

  <div class="content-wrapper">
    <RouterView />
  </div>

  <FooterBar />
</template>

<style lang="scss">
@import "@/assets/scss/petclinic.scss";
</style>
