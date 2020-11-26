import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity("payers")
export default class Payers {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  cpfCnpj: string;

  @Column()
  street: string;

  @Column()
  addressNumber: number;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipcode: number;

  @Column()
  token: string;

  @Column({ default: () => `now()` })
  createdAt: string;

  @Column({ default: () => `now()` })
  updatedAt: string;
}
