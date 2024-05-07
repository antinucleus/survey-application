import { useSelector } from 'react-redux';

import { Private } from './Private';
import { Public } from './Public';

import { RootState } from '@/stores/appStore';

export const Routes = () => {
  const { auth } = useSelector((state: RootState) => state.auth);

  return auth ? <Private /> : <Public />;
};
