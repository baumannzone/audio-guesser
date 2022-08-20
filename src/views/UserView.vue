<template>
  <article>
    <h1>{{ user.user.displayName }}</h1>
    <img :src="user.user.photoURL" alt="profile image" width="150" />
    <button class="outline" role="button" @click="handleClick">
      Desconectar
    </button>
  </article>
</template>

<script setup>
// Import vue router
import { useRouter } from "vue-router";
import { signOut } from "firebase/auth";

import { auth } from "@/firebaseConfig";
import { useUserStore } from "@/stores";

const user = useUserStore();
const router = useRouter();

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
