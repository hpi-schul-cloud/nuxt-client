import { defineStore } from "pinia";

export const useStore = defineStore("root", {
  state: () => {
    return {
      counter: 0,
    };
  },
  actions: {
    setCounter(): void {
      this.counter++;
    },
  },
  getters: {
    getCounter(state) {
      return state.counter;
    },
  },
});
