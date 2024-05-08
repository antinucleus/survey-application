import { List, Surface } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { RootState } from '@/stores/appStore';

export const Profile = () => {
  const { gender, mail, nickname } = useSelector((state: RootState) => state.userInfo);

  return (
    <Surface>
      <List.Item title="Nickname" description={nickname} />
      <List.Item title="Email" description={mail} />
      <List.Item title="Gender" description={gender} />
    </Surface>
  );
};
