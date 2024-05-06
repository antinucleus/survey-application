import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { QuestionTypes } from '../types';
import {
  updateCurrentQuestionOperation,
  updateCurrentQuestionType,
} from '../utils/currentQuestionPropertiesSlice';

type Props = {
  menuItemOnPress: () => void;
};

type Item = {
  leadingIcon: string;
  title: QuestionTypes;
};

export const QuestionTypesMenu = ({ menuItemOnPress }: Props) => {
  const dispatch = useDispatch();
  const [menuVisibility, setMenuVisibility] = useState(false);

  const handleOpenMenu = () => setMenuVisibility(true);
  const handleCloseMenu = () => setMenuVisibility(false);
  const handleItemOnPress = (questionType: QuestionTypes) => {
    dispatch(updateCurrentQuestionType(questionType));
    dispatch(updateCurrentQuestionOperation('Add'));
    handleCloseMenu();
    menuItemOnPress();
  };

  const menuItems: Item[] = [
    { leadingIcon: 'radiobox-marked', title: 'Multiple Choice' },
    { leadingIcon: 'tune-variant', title: 'Slider' },
    { leadingIcon: 'text-long', title: 'Open-ended Question' },
  ];

  return (
    <Menu
      visible={menuVisibility}
      onDismiss={handleCloseMenu}
      anchor={<IconButton mode="contained" icon="plus" size={20} onPress={handleOpenMenu} />}>
      {menuItems.map((item) => (
        <Menu.Item
          onPress={() => handleItemOnPress(item.title)}
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
