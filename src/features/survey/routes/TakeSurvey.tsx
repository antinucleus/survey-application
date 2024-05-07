import { useRoute, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Surface, useTheme, Button, Snackbar } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useSelector, useDispatch } from 'react-redux';

import { ChoiceQuestionViewer } from '../components/ChoiceQuestionViewer';
import { OpenEndedQuestionViewer } from '../components/OpenEndedQuestionViewer';
import { Progress } from '../components/Progress';
import { SliderQuestionViewer } from '../components/SliderQuestionViewer';
import { SurveyRoutesScreenNavigationProp, TakeSurveyScreenRouteProp } from '../types/SurveyRoutes';
import { ChoicesQuestionState } from '../utils/choicesQuestionsSlice';
import { updateCurrentAnswerKey } from '../utils/currentAnswerPropertiesSlice';
import { formatStorageKey } from '../utils/formatStorageKey';
import { OpenEndedQuestionState } from '../utils/openEndedQuestionSlice';
import { SliderQuestionState } from '../utils/sliderQuestionSlice';

import { RootState } from '@/stores/appStore';
import { resetAllAnswer } from '@/utils/allAnswerSlice';
import { saveItem } from '@/utils/storage';

const WINDOW_WIDTH = Dimensions.get('window').width;

export const TakeSurvey = () => {
  const route = useRoute<TakeSurveyScreenRouteProp>();
  const navigation = useNavigation<SurveyRoutesScreenNavigationProp>();

  const dispatch = useDispatch();
  const { dark } = useTheme();
  const allQuestions = useSelector((state: RootState) => state.allQuestion.questions);
  const allAnswer = useSelector((state: RootState) => state.allAnswer.answers);
  const [showMessage, setShowMessage] = useState('');
  const [current, setCurrent] = useState(0);
  const [disableButton, setDisableButton] = useState(false);
  const [savingSurvey, setSavingSurvey] = useState(false);

  const positionX = useSharedValue(0);
  const opacicty = useSharedValue(1);

  const questionAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: positionX.value }],
      opacity: opacicty.value,
    };
  });

  const bringTheQuestionAnimation = () => {
    opacicty.value = withDelay(200, withTiming(1, { duration: 400 }));
    positionX.value = withTiming(0, { duration: 700 });
  };

  const removeTheQuestionAnimation = (direction: number) => {
    opacicty.value = withTiming(0, { duration: 800 });
    positionX.value = withDelay(
      200,
      withTiming(direction * -(WINDOW_WIDTH + 50), { duration: 800 }),
    );
  };

  const handleChangeQuestion = (direction: number) => {
    setDisableButton(true);
    removeTheQuestionAnimation(direction);
    dispatch(updateCurrentAnswerKey(current));

    setTimeout(() => {
      setCurrent((c) => c + direction);
      bringTheQuestionAnimation();
    }, 700);

    setTimeout(() => {
      setDisableButton(false);
    }, 1200);
  };

  const handleSaveSurvey = async () => {
    if (allAnswer.length !== allQuestions.length) {
      console.log('ERROR COMPLETE ALL QUESTIONS');
    } else {
      setSavingSurvey(true);
      const key = formatStorageKey(route.params.surveyTitle);
      const result = await saveItem(key, JSON.stringify(allAnswer));

      if (result) {
        setShowMessage('Survey saved');
        setTimeout(() => {
          dispatch(resetAllAnswer());
          setSavingSurvey(false);
        }, 500);
        setTimeout(() => {
          navigation.navigate('Landing');
        }, 1000);
      } else {
        setShowMessage('Survey is not saved');
        setSavingSurvey(false);
      }
    }
  };

  const onDismissSnackbar = () => setShowMessage('');

  return (
    <Surface style={[styles.container, { backgroundColor: dark ? 'black' : 'white' }]}>
      <Progress question={current} />
      <Snackbar visible={showMessage !== ''} onDismiss={onDismissSnackbar}>
        {showMessage}
      </Snackbar>
      <Animated.ScrollView style={[styles.questionContainer, questionAnimatedStyle]}>
        {allQuestions.length > 0 &&
          allQuestions.map(({ question, type }, i) => {
            if (type === 'Multiple Choice') {
              return (
                <ChoiceQuestionViewer
                  questionIndex={i}
                  show={current === i}
                  question={question as ChoicesQuestionState}
                  key={`${type}-${i}`}
                />
              );
            }
            if (type === 'Slider') {
              return (
                <SliderQuestionViewer
                  questionIndex={i}
                  show={current === i}
                  question={question as SliderQuestionState}
                  key={`${type}-${i}`}
                />
              );
            }
            if (type === 'Open-ended Question') {
              return (
                <OpenEndedQuestionViewer
                  questionIndex={i}
                  show={current === i}
                  question={question as OpenEndedQuestionState}
                  key={`${type}-${i}`}
                />
              );
            }
          })}
      </Animated.ScrollView>

      <View style={styles.bottomButtonContainer}>
        <Button
          style={styles.bottomButtons}
          mode="outlined"
          onPress={() => handleChangeQuestion(-1)}
          disabled={current === 0 || disableButton}>
          Previous
        </Button>

        {current === allQuestions.length - 1 ? (
          <Button
            mode="contained"
            loading={savingSurvey}
            onPress={handleSaveSurvey}
            style={[styles.bottomButtons, { width: '50%' }]}
            disabled={disableButton || allAnswer[current] === undefined}>
            Complete
          </Button>
        ) : (
          <Button
            style={styles.bottomButtons}
            mode="outlined"
            onPress={() => handleChangeQuestion(1)}
            disabled={
              current === allQuestions.length - 1 ||
              disableButton ||
              allAnswer[current] === undefined
            }>
            Next
          </Button>
        )}
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  bottomButtons: {
    width: '30%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  bottomButtonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 10,
  },
  questionContainer: { height: '80%' },
});
