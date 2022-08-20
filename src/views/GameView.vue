<template>
  <div class="audio-guesser">
    <main>
      <header className="headings">
        <h1>Adivina la voz</h1>
        <h3>Escucha los audios y adivina quién es para ganar puntos</h3>
      </header>

      <article v-for="(user, index) in users" :key="user.id">
        <header className="headings">
          <h4>¿De quién es esta voz?</h4>
          <h5>Reproduce el audio para adivinar quién es</h5>
        </header>
        <span>Audio {{ index + 1 }}/{{ users.length }}</span>
        <audio :src="`/voices/${user.id}.mp3`" controls preload="none" />

        <label htmlFor="select">Elige una opción 👇</label>
        <select id="select" @input="handleInput($event, user)" value="">
          <option value="" disabled>Elige una opción</option>
          <option v-for="u in users" :key="u.id" :value="u.id">
            {{ u.displayName }}
          </option>
        </select>
      </article>

      <hr />

      <button @click="handleClick" :disabled="isButtonDisabled">
        Guardar respuestas
      </button>
      <p v-if="isButtonDisabled">
        <em>
          Has respondido ({{ responsesLength }} audios de {{ users.length }}).
        </em>
      </p>

      <pre>{{ JSON.stringify(responses, null, 2) }}</pre>
    </main>
  </div>
</template>

<script>
// import { useRouter } from "vue-router";
import { randomUsers } from "@/data/users.js";
import { collection, addDoc } from "firebase/firestore";

import { database } from "@/firebaseConfig";
import { useUserStore } from "@/stores";
const user = useUserStore();

const dbInstance = collection(database, "responses");

export default {
  data() {
    return {
      responses: {},
      users: randomUsers(),
    };
  },
  computed: {
    responsesLength() {
      return Object.keys(this.responses).length;
    },
    isButtonDisabled() {
      return this.responsesLength < this.users.length;
    },
  },
  methods: {
    handleInput(ev, currentUser) {
      this.responses[currentUser.id] = {
        audioUserId: String(currentUser.id),
        selectedUserId: ev.target.value,
      };
    },
    handleClick() {
      // Get points from responses
      const points = Array.from(Object.values(this.responses)).reduce(
        (acc, curr) => {
          return curr.selectedUserId === curr.audioUserId ? acc + 1 : acc;
        },
        0
      );

      const data = {
        user: {
          uid: user.user.uid,
          name: user.user.displayName,
          email: user.user.email,
          photoURL: user.user.photoURL,
        },
        responses: this.responses,
        points,
        room: "5v",
      };

      addDoc(dbInstance, data)
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },
  },
  // beforeRouteEnter() {
  //   const router = useRouter();
  //   const userStore = useUserStore();
  //   if (!userStore.isLoggedIn) {
  //     console.log("Not logged in");
  //     // redirect home
  //     router.push({ name: "home" });
  //   }
  // },
};
</script>

<style scoped>
.progressLabel {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0;
}

audio {
  width: 100%;
  display: block;
  margin-bottom: 1rem;
}
</style>
