import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { GenreEntity } from './genre.entity';
import { FavoriteEntity } from './favorite.entity';

@Entity({ name: 'movies' })
export class MovieEntity {
    @PrimaryGeneratedColumn('uuid')
    movie_id: string;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'varchar' })
    director: string;

    @Column({ type: 'int' })
    release_year: number;

    @ManyToOne(() => GenreEntity, (genre) => genre.movies)
    genre: GenreEntity[];

    @OneToMany(() => FavoriteEntity, (favorite) => favorite.movie)
    favorites: FavoriteEntity[];
}
