import type { UserDto } from "@/models/entities/UserDto";
import type { AxiosInstance } from "axios";
import { AbstractUserApi } from "./AbstractUser";

export class UserApi extends AbstractUserApi {
  constructor(apiClient: AxiosInstance) {
    super(apiClient);
  }

  getMe = () => {
    return this.getRequest<UserDto>("me/");
  };
}
