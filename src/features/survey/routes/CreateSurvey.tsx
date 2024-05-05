import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, Title } from 'react-native-paper';

import { CreateQuestionForm, QuestionTypesMenu } from '../components';

export const CreateSurvey = () => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const handleOpenQuestionForm = () => setModalVisibility(true);
  const handleCloseQuestionForm = () => setModalVisibility(false);

  return (
    <Surface style={styles.container}>
      <Title>Create Survey</Title>
      <Text> There is no question yet</Text>
      <View style={styles.menuContainer}>
        <QuestionTypesMenu menuItemOnPress={handleOpenQuestionForm} />
      </View>
      <CreateQuestionForm
        modalVisibility={modalVisibility}
        handleCloseQuestionForm={handleCloseQuestionForm}
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 'auto',
    alignItems: 'center',
  },
  menuContainer: { marginTop: 5 },
});
