<template>
  <article v-if="isLoggedIn">
    <h1>{{ user.user.displayName }}</h1>
    <img :src="user.user.photoURL" alt="profile image" width="150" />
    <button class="outline" role="button" @click="handleClick">
      Desconectar
    </button>
  </article>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { signOut } from "firebase/auth";

import { auth } from "@/firebaseConfig";
import { useUserStore } from "@/stores";

const router = useRouter();
const user = useUserStore();
const isLoggedIn = computed(() => user.isLoggedIn);

const handleClick = () => {
  signOut(auth)
    .then(() => {
      user.setUser(null);
      router.push("/");
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<style scoped>
article {
  text-align: center;
}

article img {
  border-radius: 100%;
  margin-bottom: 0.5rem;
}
</style>
