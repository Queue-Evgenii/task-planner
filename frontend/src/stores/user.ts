import type { UserDto } from '@/models/entities/UserDto';
import { defineStore } from 'pinia';

interface UserState {
  _user: UserDto | undefined
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    _user: undefined
  }),
  getters: {
    user(): UserDto | undefined {
      return this._user;
    },
    fullname(): string {
      if (this._user)
        return (this._user.name + ' ' + this._user.surname).trim();
      return '';
    }
  },
  actions: {
    setUser(user: UserDto) {
      this._user = {...user};
    },
    clearState(): void {
      this._user = undefined;
    }
  },
});
