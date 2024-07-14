import { TerrariumsInterface } from '../entities';
import { User } from '../../auth/infraestructure/ports/mysql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TerrariumsProfile } from './terrariums_profile.entity';

@Entity({ name: 'terrariums' })
export class Terrariums implements TerrariumsInterface {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 40 })
  codeEsp: string;
  @Column({ length: 60 })
  name: string;
  @ManyToOne(() => User, (user) => user.terrariums)
  @JoinColumn({ name: 'id_user' })
  user: User;
  @OneToOne(() => TerrariumsProfile, (terrarium) => terrarium.terrarium, {
    cascade: true,
  })
  @JoinColumn({ name: 'id_terrarium_profile' })
  terrariumProfile: TerrariumsProfile;
}
