<template>
  <div class="audio-guesser">
    <main v-if="!dataSent">
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
          Has respondido {{ responsesLength }} audios de {{ users.length }}.
        </em>
      </p>

      <pre v-if="isBaumann">{{ JSON.stringify(responses, null, 2) }}</pre>
    </main>
    <div v-else>
      <h4>Datos guardados correctamente.</h4>
      <p>
        Has conseguido <kbd>{{ points }}</kbd> puntos.
      </p>
      <button role="button" @click="playAgain">Volver a jugar</button>
    </div>
  </div>
</template>

<script>
import { randomUsers, createUserData } from "@/data/users.js";
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
      dataSent: false,
      points: 0,
    };
  },
  computed: {
    responsesLength() {
      return Object.keys(this.responses).length;
    },
    isButtonDisabled() {
      return this.responsesLength < this.users.length;
    },
    isBaumann() {
      return user.userUid === "P8J8JTb3XLgsavLKgkjAjJ9X7143";
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

      this.points = points;

      const data = createUserData({
        user,
        points,
        responses: this.responses,
        room: "5v",
        totalAudios: this.users.length,
      });

      addDoc(dbInstance, data)
        .then(() => {
          console.log("Document successfully written!");
          this.dataSent = true;
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },
    playAgain() {
      this.points = 0;
      this.responses = {};
      this.dataSent = false;
    },
  },
};
</script>

<style scoped>
audio {
  width: 100%;
  display: block;
  margin-bottom: 1rem;
}
</style>
