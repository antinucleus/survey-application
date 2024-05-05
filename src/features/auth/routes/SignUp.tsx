import { StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';

export const SignUp = () => {
  return (
    <Surface style={styles.container}>
      <Text>Sign Up page</Text>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
