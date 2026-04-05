import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { AdoptionApplication } from './adoption-application.entity';
import { Favorite } from './favorite.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({ name: 'user_id' })
    userId!: number;

    @Column()
    name!: string;

    @Column({unique: true})
    email!: string;

    @Column()
    password!: string;

    @Column()
    role!: string;
    
    @Column({nullable: true})
    phone?: string;

    @Column({nullable: true})
    gender?: string;

    @Column({ nullable: true })
    address?: string;  

    @Column({ nullable: true })
    preferredSpecies?: string;  

    // Relations to other entities
    @OneToMany(() => AdoptionApplication, app => app.adopter)
    applications!: AdoptionApplication[];

    @OneToMany(() => Favorite, fav => fav.adopter)
    favorites!: Favorite[];
}