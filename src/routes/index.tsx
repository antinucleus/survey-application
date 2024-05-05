import { Private } from './Private';
import { Public } from './Public';

export const Routes = () => {
  const auth = true;

  return auth ? <Private /> : <Public />;
};
