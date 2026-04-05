import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pets')
export class Pet {
    @PrimaryGeneratedColumn()
    petId!: number;

    @Column()
    name!: string;

    @Column()
    breed!: string;

    @Column()
    species!: string;
}