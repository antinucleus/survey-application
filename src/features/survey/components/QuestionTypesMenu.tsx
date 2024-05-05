import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';

type Props = {
  menuItemOnPress: () => void;
};

type Item = {
  leadingIcon: string;
  title: string;
  onPress?: () => void;
};

export const QuestionTypesMenu = ({ menuItemOnPress }: Props) => {
  const [menuVisibility, setMenuVisibility] = useState(false);

  const handleOpenMenu = () => setMenuVisibility(true);
  const handleCloseMenu = () => setMenuVisibility(false);

  const menuItems: Item[] = [
    { leadingIcon: 'radiobox-marked', title: 'Choices' },
    { leadingIcon: 'tune-variant', title: 'Slider' },
    { leadingIcon: 'checkbox-multiple-marked', title: 'Selections' },
    { leadingIcon: 'text-long', title: 'Open-ended Question' },
  ];

  return (
    <Menu
      visible={menuVisibility}
      onDismiss={handleCloseMenu}
      anchor={<IconButton mode="contained" icon="plus" size={20} onPress={handleOpenMenu} />}>
      {menuItems.map((item) => (
        <Menu.Item
          onPress={() => {
            handleCloseMenu();
            menuItemOnPress();
          }}
          titleStyle={styles.title}
          {...item}
          key={item.title}
        />
      ))}
    </Menu>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
  },
});
