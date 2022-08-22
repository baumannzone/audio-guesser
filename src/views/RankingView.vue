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
              <th scope="col">Porcentaje</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="res in responses" :key="res.id" :class="res.customClass">
              <td scope="row">
                <img
                  class="rounded"
                  :src="res.user.photoURL"
                  :alt="res.displayName"
                  loading="lazy"
                  width="32"
                />
              </td>
              <td>{{ res.user.displayName }}</td>
              <td>{{ res.points }} / {{ res.totalAudios }}</td>
              <td>{{ getPercentage(res.points, res.totalAudios) }}%</td>
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
import { useUserStore } from "@/stores";

const user = useUserStore();
const responsesRef = collection(database, "responses");

export default {
  data() {
    return {
      loading: true,
      responses: [],
    };
  },
  computed: {
    userUid: () => user.userUid,
    isLoggedIn: () => user.isLoggedIn,
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
          if (this.isLoggedIn) {
            this.responses = this.responses.map((res) => {
              if (res.user.uid === this.userUid) {
                return { ...res, customClass: "current-user" };
              }
              return res;
            });
          }
          this.loading = false;
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
          this.loading = false;
        });
    },
    getPercentage(points, totalAudios) {
      return (points / totalAudios) * 100;
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

.current-user {
  background-color: #ffeb3b !important;
}
</style>
