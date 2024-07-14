import { UserInterface } from "./user";

export interface UserProfileInterface {
  id: number;
  name: string;
  last_name: string;
  user?: UserInterface;
}
