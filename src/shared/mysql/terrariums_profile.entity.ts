import { TerrariumsProfileInterface } from '../entities';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Terrariums } from './terrariums.entity';

@Entity({ name: 'terrariums_profile' })
export class TerrariumsProfile implements TerrariumsProfileInterface {
  @PrimaryGeneratedColumn()
    id: number;
  @Column({ type: 'float' })
    max_temp: number;
  @Column({ type: 'float' })
    min_temp: number;
  @Column({ type: 'float' })
    max_humidity: number;
  @Column({ type: 'float' })
    min_humidity: number;
  @Column({ type: 'float' })
    max_uv: number;
  @Column({ type: 'float' })
    min_uv: number;
  @OneToOne(() => Terrariums, (terrarium) => terrarium.terrariumProfile)
    terrarium: Terrariums;
}
