import { TerrariumsInterface } from './terrariums';

export interface TerrariumsProfileInterface {
  id: number;
  max_temp: number;
  min_temp: number;
  max_humidity: number;
  min_humidity: number;
  max_uv: number;
  min_uv: number;
  terrarium?: TerrariumsInterface;
}
