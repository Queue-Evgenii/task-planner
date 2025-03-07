import axios from "@/api/index"
import type { User } from "@/models/user"

const registration = (data: User): Promise<Object> => axios.post("/user/create", data);

const authorization = (data: User): Promise<Object> => axios.post("/user/login", data);

export {
  registration,
  authorization
}
