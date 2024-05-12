import { UUID } from 'crypto';

export type User = {
    user_id: UUID;
    name: string;
    email: string;
    password: string;
};
