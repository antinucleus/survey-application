import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

type Props = {
  question: number;
};

export const Progress = ({ question }: Props) => {
  return (
    <View style={styles.container}>
      <Text>Question {question + 1} </Text>
      <Text>Time </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
});
