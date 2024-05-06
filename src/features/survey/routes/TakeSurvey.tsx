import { Surface, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { ChoiceQuestionViewer } from '../components/ChoiceQuestionViewer';
import { ChoicesQuestionState } from '../utils/choicesQuestionsSlice';

import { RootState } from '@/stores/appStore';

export const TakeSurvey = () => {
  const { dark } = useTheme();
  const allQuestions = useSelector((state: RootState) => state.allQuestion.questions);

  return (
    <Surface style={{ flex: 1, width: '100%', backgroundColor: dark ? 'black' : 'white' }}>
      {allQuestions.map(({ question, type }, i) => {
        if (type === 'Multiple Choice') {
          return (
            <ChoiceQuestionViewer
              question={question as ChoicesQuestionState}
              key={`${type}-${i}`}
            />
          );
        }
      })}
    </Surface>
  );
};
