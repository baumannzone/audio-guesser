<script setup>
import { computed } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useUserStore } from "@/stores";

import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { auth } from "@/firebaseConfig";

const provider = new GoogleAuthProvider();
const router = useRouter();
let loading = false;

const user = useUserStore();
const isLoggedIn = computed(() => user.isLoggedIn);

function handleClick(e) {
  e.preventDefault();
  loading = true;

  signInWithPopup(auth, provider)
    .then((result) => {
      const userData = result.user;
      console.log(userData);

      // Save the user in the store
      user.setUser(userData);
      router.push({ name: "game" });
      loading = false;
    })
    .catch((error) => {
      loading = false;
      console.log(error);
    });
}
</script>

<template>
  <main class="container">
    <div class="article">
      <p v-if="isLoggedIn">
        Ya has iniciado sesión. <RouterLink to="/game">Ir a jugar</RouterLink>.
      </p>
      <div v-else>
        <p>
          Inicia sesión para jugar. Se necesita una cuenta de Gmail para poder
          jugar.
        </p>
        <button @click="handleClick" :aria-busy="loading">
          Iniciar sesión
        </button>
      </div>
    </div>
  </main>
</template>
