import { StyleSheet, View } from 'react-native';
import { Surface, Text, Title } from 'react-native-paper';

import { QuestionTypesMenu } from '../components';

export const CreateSurvey = () => {
  return (
    <Surface style={styles.container}>
      <Title>Create Survey</Title>
      <Text> There is no question yet</Text>
      <View style={styles.menuContainer}>
        <QuestionTypesMenu />
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
  menuContainer: { marginTop: 5 },
});
