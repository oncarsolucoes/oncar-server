import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    active: boolean;

    @Column({ default: () => `now()` })
    createdAt: string;

    @Column({ default: () => `now()` })
    updatedAt: string;
}