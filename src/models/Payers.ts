import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export default class Payers {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    street: string;

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
