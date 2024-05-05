import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Surface, TextInput } from 'react-native-paper';

export const Login = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const handleNicknameChange = (e: string) => setNickname(e);
  const handlePasswordChange = (e: string) => setPassword(e);
  const handleTextInputPress = () => setShowPassword(!showPassword);
  const handleSignIn = () => {};

  return (
    <Surface style={styles.container}>
      <TextInput
        label="Nickname"
        mode="outlined"
        style={styles.textInput}
        value={nickname}
        onChangeText={handleNicknameChange}
      />
      <TextInput
        label="Password"
        mode="outlined"
        value={password}
        style={[styles.passwordTextInputStyle, styles.textInput]}
        secureTextEntry={showPassword}
        onChangeText={handlePasswordChange}
        right={
          <TextInput.Icon
            onPress={handleTextInputPress}
            icon={`${showPassword ? 'eye-off' : 'eye'}`}
          />
        }
      />

      <Button style={styles.signIn} mode="contained" onPress={handleSignIn}>
        Sign In
      </Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordTextInputStyle: {
    marginVertical: 50,
  },
  signIn: {
    width: '50%',
  },
  textInput: {
    width: '100%',
  },
});
