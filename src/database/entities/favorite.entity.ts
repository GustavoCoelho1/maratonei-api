import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { MovieEntity } from './movie.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'genres' })
export class FavoriteEntity {
    @PrimaryGeneratedColumn('uuid')
    favorite_id: string;

    @ManyToOne(() => UserEntity, (user) => user.favorites)
    user: UserEntity;

    @ManyToOne(() => MovieEntity, (movie) => movie.favorites)
    movie: MovieEntity;
}
