import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { CreateQuestionForm, QuestionTypesMenu, QuestionsList } from '../components';

import { RootState } from '@/stores/appStore';

export const CreateSurvey = () => {
  const allQuestions = useSelector((state: RootState) => state.allQuestion.questions);
  const [modalVisibility, setModalVisibility] = useState(false);

  const handleOpenQuestionForm = () => setModalVisibility(true);
  const handleCloseQuestionForm = () => setModalVisibility(false);

  return (
    <Surface style={styles.container}>
      <Title>Create Survey</Title>
      <View style={styles.innerContainer}>
        {allQuestions.length > 0 ? (
          <QuestionsList listItemOnPress={handleOpenQuestionForm} />
        ) : (
          <Text> There is no question yet</Text>
        )}
        <View style={styles.menuContainer}>
          <QuestionTypesMenu menuItemOnPress={handleOpenQuestionForm} />
        </View>
        <CreateQuestionForm
          modalVisibility={modalVisibility}
          handleCloseQuestionForm={handleCloseQuestionForm}
        />
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 'auto',
    alignItems: 'center',
  },
  innerContainer: { width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  menuContainer: { marginVertical: 5 },
});
