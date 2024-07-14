import { UserProfileInterface } from '../../../domain/entities';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'users_profile' })
export class UserProfile implements UserProfileInterface {
  @PrimaryGeneratedColumn()
  readonly id: number;
  @Column({ nullable: false, length: 60 })
  readonly name: string;
  @Column({ nullable: true, length: 60 })
  readonly last_name: string;
  @OneToOne(() => User, (user) => user.userProfile)
  readonly user: User;
}
