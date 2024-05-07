import { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Card, Text, TextInput } from 'react-native-paper';

import { OpenEndedQuestionState } from '../utils/openEndedQuestionSlice';

type Props = { question: OpenEndedQuestionState; show: boolean };

export const OpenEndedQuestionViewer = ({ question, show }: Props) => {
  const [ans, setAns] = useState('');

  const handleAnswerChange = (e: string) => setAns(e);

  return (
    <Card style={[styles.card, { display: show ? 'flex' : 'none' }]}>
      <Card.Content>
        <Text variant="titleMedium">{question.openEnded.question}</Text>
        <ScrollView style={{ height: '100%', overflow: 'scroll' }}>
          <TextInput
            maxLength={250}
            autoCorrect={false}
            mode="outlined"
            label="Answer"
            value={ans}
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
