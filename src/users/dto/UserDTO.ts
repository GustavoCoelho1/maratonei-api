import { User } from '@/types/User';

export type SaveUserDTO = Omit<User, 'user_id'>;
