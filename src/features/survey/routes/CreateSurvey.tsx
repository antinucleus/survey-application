import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { HelperText, Snackbar, Surface, Text, TextInput, Title } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import { CreateQuestionForm, QuestionTypesMenu, QuestionsList } from '../components';
import { SurveyRoutesScreenNavigationProp } from '../types';

import { RootState } from '@/stores/appStore';
import { addEmptyAnswer, initAnswer } from '@/utils/allAnswerSlice';
import { addSurvey } from '@/utils/allSurveySlice';

export const CreateSurvey = () => {
  const navigation = useNavigation<SurveyRoutesScreenNavigationProp>();
  const dispatch = useDispatch();
  const allQuestions = useSelector((state: RootState) => state.allQuestion.questions);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [surveyTitle, setSurveyTitle] = useState('');
  const [showMessage, setShowMessage] = useState('');
  const [disable, setDisable] = useState(true);

  const handleOpenQuestionForm = () => setModalVisibility(true);
  const handleCloseQuestionForm = () => setModalVisibility(false);
  const handleSurveyTitleChange = (e: string) => {
    setSurveyTitle(e);
    if (e === '') {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };
  const onDismissSnackbar = () => setShowMessage('');

  const handleSaveSurvey = () => {
    for (const q of allQuestions) {
      console.log(q.question);
    }

    if (disable === false) {
      console.log('CERATE SURVEY:', surveyTitle);
      dispatch(addEmptyAnswer({ surveyAnswers: [], title: surveyTitle }));
      dispatch(addSurvey({ survey: allQuestions, title: surveyTitle }));
      setShowMessage('Survey created');

      setTimeout(() => {
        navigation.navigate('Landing');
      }, 1000);
    }
  };

  return (
    <Surface style={styles.container}>
      <Snackbar visible={showMessage !== ''} onDismiss={onDismissSnackbar}>
        {showMessage}
      </Snackbar>
      <Title>Create Survey</Title>
      <TextInput
        style={styles.surveyTitle}
        autoCorrect={false}
        mode="outlined"
        placeholder="Enter survey title here"
        label="Survey title"
        onChangeText={handleSurveyTitleChange}
        value={surveyTitle}
        error={surveyTitle.length === 0}
      />
      <HelperText style={styles.helperText} type="error" visible={surveyTitle.length === 0}>
        Survey title can not be empty
      </HelperText>

      <View style={styles.innerContainer}>
        {allQuestions.length > 0 ? (
          <QuestionsList
            error={disable}
            handleSave={handleSaveSurvey}
            listItemOnPress={handleOpenQuestionForm}
          />
        ) : (
          <HelperText type="error" visible={allQuestions.length === 0}>
            No questions added yet
          </HelperText>
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
    padding: 10,
  },
  helperText: { width: '100%' },
  innerContainer: { width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  menuContainer: { marginVertical: 5 },
  surveyTitle: { width: '100%' },
});
