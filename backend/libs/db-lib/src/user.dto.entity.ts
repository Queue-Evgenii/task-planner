import { Entity, Column, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  name: string;

  @Column()
  surname: string;
}
