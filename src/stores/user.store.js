import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    userUid: (state) => (state.user ? state.user.uid : null),
  },
});
