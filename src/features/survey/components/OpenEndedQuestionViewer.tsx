import { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Card, Text, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { OpenEndedQuestionState } from '../utils/openEndedQuestionSlice';

import { updateAllAnswer } from '@/utils/allAnswerSlice';

type Props = { question: OpenEndedQuestionState; show: boolean; questionIndex: number };

export const OpenEndedQuestionViewer = ({ question, show, questionIndex }: Props) => {
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState('');

  const handleAnswerChange = (e: string) => {
    dispatch(
      updateAllAnswer({
        answer: { answer: e, type: 'Open-ended Question' },
        answerIndex: questionIndex,
      }),
    );
    setAnswer(e);
  };

  return (
    <Card style={[styles.card, { display: show ? 'flex' : 'none' }]}>
      <Card.Content>
        <Text variant="titleMedium">{question.openEnded.question}</Text>
        <ScrollView style={{ height: '100%', overflow: 'scroll' }}>
          <TextInput
            maxLength={question.openEnded.values.maxLength}
            autoCorrect={false}
            mode="outlined"
            label="Answer"
            placeholder="Enter your answer here"
            value={answer}
            onChangeText={handleAnswerChange}
          />
        </ScrollView>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
  },
});
