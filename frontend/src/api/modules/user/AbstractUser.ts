import { Api } from '@/api/Api';
import type { AxiosInstance } from 'axios';

export class AbstractUserApi extends Api {
  constructor(apiClient: AxiosInstance) {
    super(apiClient, 'user/');
  }
}
