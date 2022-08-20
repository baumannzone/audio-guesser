<script setup>
import { computed } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "@/stores";

const user = useUserStore();
const isLoggedIn = computed(() => user.isLoggedIn);
</script>

<template>
  <div class="container">
    <nav class="spacing">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/game">Game</RouterLink>
      <RouterLink to="/game">Game</RouterLink>
    </nav>

    <hr />

    <RouterView />
  </div>
</template>

<style>
.spacing {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
