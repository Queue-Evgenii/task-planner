import { defineStore } from 'pinia';
import axios from 'axios';
import { Token } from '@/models/utils/browser/Token';

export const useAuthStore = defineStore('user', {
  state: () => ({
    token: Token.get(),
  }),
  actions: {
    logout() {
      this.token = "";
    },
  },
});
