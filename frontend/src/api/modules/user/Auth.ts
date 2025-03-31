import type { UserDto } from '@/models/entities/UserDto';
import type { AxiosInstance } from 'axios';
import { AbstractUserApi } from './AbstractUser';

export class AuthApi extends AbstractUserApi {
  constructor(apiClient: AxiosInstance) {
    super(apiClient);
  }

  authorization = (payload: Partial<UserDto>) => {
    return this.postRequest<string, Partial<UserDto>>('login', payload);
  };

  registration = (payload: UserDto) => {
    return this.postRequest<string, UserDto>('create', payload);
  };
}
