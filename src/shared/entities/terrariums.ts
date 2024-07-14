import { TerrariumsProfileInterface } from "./terrariums_profile";
import { UpdateUserDto } from "../../auth/domain/dto";

export interface TerrariumsInterface {
  id: number;
  codeEsp : string;
  name: string;
  user?: UpdateUserDto;
  terrariumProfile: TerrariumsProfileInterface;
}
