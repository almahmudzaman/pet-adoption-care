import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Pet } from './pet.entity';

@Entity('favorites')
export class Favorite {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.favorites, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'adopter_id' })
    adopter!: User;

    @ManyToOne(() => Pet, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'pet_id' })
    pet!: Pet;
}