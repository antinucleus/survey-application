import { axios } from '@/lib';

type Login = {
  username: string;
  password: string;
};

export const login = (login?: Login) => axios.get('/users/1');
