<script setup>
import { computed } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "@/stores";

const user = useUserStore();
const isLoggedIn = computed(() => user.isLoggedIn);
</script>

<template>
  <div class="container">
    <nav>
      <ul>
        <li><strong>Adivina la Voz</strong></li>
      </ul>
      <ul>
        <li><RouterLink to="/">Login</RouterLink></li>
        <li><RouterLink v-if="isLoggedIn" to="/game">Game</RouterLink></li>
        <li><RouterLink to="/ranking">Ranking</RouterLink></li>
        <li>
          <RouterLink v-if="isLoggedIn" to="/user">
            <img
              class="rounded"
              :src="user.user.photoURL"
              alt="profile image"
              width="25"
            />
          </RouterLink>
        </li>
      </ul>
    </nav>

    <hr />

    <RouterView />
  </div>
</template>

<style>
nav .router-link-active,
nav .router-link-exact-active {
  font-weight: bold;
}

.rounded {
  border-radius: 100%;
}
</style>
