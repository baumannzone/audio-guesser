<template>
  <div class="score-view">
    <main>
      <h1>Ranking 🎖</h1>

      <figure :aria-busy="loading">
        <table role="grid">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Puntos</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="res in responses" :key="res.id">
              <th scope="row">
                <img
                  class="rounded"
                  :src="res.user.photoURL"
                  :alt="res.displayName"
                  loading="lazy"
                  width="32"
                />
              </th>
              <td>{{ res.user.displayName }}</td>
              <td>{{ res.points }}</td>
            </tr>
          </tbody>
        </table>
      </figure>
    </main>
  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import { database } from "@/firebaseConfig";

const responsesRef = collection(database, "responses");

// const q = query(responsesRef, where("points", ">", "0"));

export default {
  data() {
    return {
      responses: [],
      loading: true,
    };
  },
  vcomputed: {
    responsesSorted() {
      return this.responses.sort((a, b) => b.points - a.points);
    },
  },
  methods: {
    fetchData() {
      getDocs(responsesRef)
        .then((querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
          });
          this.responses = data.sort((a, b) => b.points - a.points);
          this.loading = false;
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
          this.loading = false;
        });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.rounded {
  border-radius: 50%;
}
</style>
