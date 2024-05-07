import { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Surface, useTheme, Text, Button } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';

import { ChoiceQuestionViewer } from '../components/ChoiceQuestionViewer';
import { ChoicesQuestionState } from '../utils/choicesQuestionsSlice';

import { RootState } from '@/stores/appStore';

const WINDOW_WIDTH = Dimensions.get('window').width;

export const TakeSurvey = () => {
  const { dark } = useTheme();
  const allQuestions = useSelector((state: RootState) => state.allQuestion.questions);
  const [current, setCurrent] = useState(0);
  const [disableButton, setDisableButton] = useState(false);

  const positionX = useSharedValue(0);
  const opacicty = useSharedValue(1);

  const testAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: positionX.value }],
      opacity: opacicty.value,
    };
  });

  const bringTheQuestionAnimation = () => {
    opacicty.value = withDelay(200, withTiming(1, { duration: 400 }));
    positionX.value = withTiming(0, { duration: 700 });
  };

  const removeTheQuestionAnimation = () => {
    opacicty.value = withTiming(0, { duration: 800 });
    positionX.value = withDelay(200, withTiming(WINDOW_WIDTH, { duration: 800 }));
  };

  const handleNext = () => {
    setDisableButton(true);

    setTimeout(() => {
      setCurrent((c) => c + 1);
      bringTheQuestionAnimation();
    }, 700);

    setTimeout(() => {
      setDisableButton(false);
    }, 1200);

    removeTheQuestionAnimation();
  };

  const handlePrevious = () => {
    setDisableButton(true);

    setTimeout(() => {
      setCurrent((c) => c - 1);
      bringTheQuestionAnimation();
    }, 700);

    setTimeout(() => {
      setDisableButton(false);
    }, 1200);

    removeTheQuestionAnimation();
  };

  return (
    <Surface
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: dark ? 'black' : 'white',
        padding: 10,
      }}>
      <View style={{ marginVertical: 10 }}>
        <Text>Question {current + 1} </Text>
        <Text>Time </Text>
      </View>

      <Animated.ScrollView style={[{ height: '80%' }, testAnimatedStyle]}>
        {allQuestions.map(({ question, type }, i) => {
          if (type === 'Multiple Choice') {
            return (
              <ChoiceQuestionViewer
                show={current === i}
                question={question as ChoicesQuestionState}
                key={`${type}-${i}`}
              />
            );
          }
        })}
      </Animated.ScrollView>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          style={{ width: '30%', alignSelf: 'center', marginVertical: 10 }}
          mode="outlined"
          onPress={handlePrevious}
          disabled={current === 0 || disableButton}>
          Previous
        </Button>
        <Button
          style={{ width: '30%', alignSelf: 'center', marginVertical: 10 }}
          mode="outlined"
          onPress={handleNext}
          disabled={current === allQuestions.length - 1 || disableButton}>
          Next
        </Button>
      </View>
    </Surface>
  );
};
