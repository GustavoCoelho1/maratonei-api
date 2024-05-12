import { UUID } from 'crypto';

export type Rating = {
    rating_id: UUID;
    rating: number;
    user_id: UUID;
    movie_id: UUID;
};
