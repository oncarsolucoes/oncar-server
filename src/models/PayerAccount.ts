import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import Payer from './Payers';

@Entity("payer_accounts")
export default class PayerAccount {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  bankCode: number;

  @Column()
  agency: number;

  @Column()
  agencyDigit: number;

  @Column()
  accountNumber: number;

  @Column()
  accountNumberDigit: number;

  @Column()
  accountDac: number;

  @Column()
  convenioNumber: number;

  @Column()
  remessaSequential: number;

  @Column({ default: () => `now()` })
  createdAt: string;

  @Column({ default: () => `now()` })
  updatedAt: string;

  @ManyToOne((type) => Payer)
  @JoinColumn({ name: "payer_id" })
  payer: Payer;
}
