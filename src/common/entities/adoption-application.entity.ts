import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Pet } from './pet.entity';

@Entity('adoption_applications')
export class AdoptionApplication {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.applications, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'adopter_id' })
    adopter!: User;

    @ManyToOne(() => Pet, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'pet_id' })
    pet!: Pet;

    @Column({ type: 'text' })
    message!: string;

    @Column({ default: 'PENDING' })
    status!: string;
}