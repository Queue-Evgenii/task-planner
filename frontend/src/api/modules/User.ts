import { Api } from "@/api/Api";
import type { UserDto } from "@/models/entities/UserDto";
import type { TokenDto } from "@/models/entities/TokenDto";
import type { AxiosInstance } from "axios";

export class UserApi extends Api {
  constructor(apiClient: AxiosInstance) {
    super(apiClient, "user/");
  }

  authorization = (payload: Partial<UserDto>) => {
    return this.postRequest<TokenDto, Partial<UserDto>>("login", payload);
  };

  registration = (payload: UserDto) => {
    return this.postRequest<UserDto, UserDto>("create", payload);
  };
}
