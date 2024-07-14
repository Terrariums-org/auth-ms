import { PayloadInterface } from './payload.interface';

export interface DecodeTokenInterface extends PayloadInterface{
    exp : number;
}