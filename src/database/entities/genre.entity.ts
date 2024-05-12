import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MovieEntity } from './movie.entity';

@Entity({ name: 'genres' })
export class GenreEntity {
    @PrimaryGeneratedColumn('uuid')
    genre_id: string;

    @Column({ type: 'varchar' })
    name: string;

    @OneToMany(() => MovieEntity, (movie) => movie.genre)
    movies: MovieEntity[];
}
