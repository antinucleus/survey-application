import { axios } from '@/lib';

type SignUp = {
  username: string;
  mail: string;
  password: string;
};

export const signUp = (signUp?: SignUp) => axios.get('/users/1');
