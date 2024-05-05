import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, TextInput, Button, Text } from 'react-native-paper';

import { PublicRoutesScreenNavigationProp } from '@/types';

export const SignUp = () => {
  const navigation = useNavigation<PublicRoutesScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const handleEmailChange = (e: string) => setEmail(e);
  const handleNicknameChange = (e: string) => setNickname(e);
  const handlePasswordChange = (e: string) => setPassword(e);
  const handleBirthDateChange = (e: string) => setBirthDate(e);
  const handleTextInputPress = () => setShowPassword(!showPassword);
  const handleSignUp = () => {};
  const handleLogin = () => navigation.goBack();

  return (
    <Surface style={styles.container}>
      <Text>Cinsiyetinizi Seçiniz</Text>
      <View style={styles.gender}>
        <Button mode="contained">Erkek</Button>
        <Button mode="contained"> Kadın</Button>
      </View>
      <TextInput
        label="Email"
        mode="outlined"
        style={styles.textInput}
        value={email}
        onChangeText={handleEmailChange}
      />
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
        style={styles.textInput}
        secureTextEntry={showPassword}
        onChangeText={handlePasswordChange}
        right={
          <TextInput.Icon
            onPress={handleTextInputPress}
            icon={`${showPassword ? 'eye-off' : 'eye'}`}
          />
        }
      />

      <TextInput
        label="BirthDate"
        mode="outlined"
        value={birthDate}
        style={styles.textInput}
        onChangeText={handleBirthDateChange}
      />

      <Button style={styles.signUp} mode="contained" onPress={handleSignUp}>
        Sign Up
      </Button>

      <View style={styles.bottomText}>
        <Text>Hesabın var mı?</Text>
        <Button
          compact
          mode="text"
          rippleColor="rgba(0, 0, 255, 0.05)"
          textColor="blue"
          onPress={handleLogin}>
          Giriş Yap
        </Button>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  bottomText: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountText: { color: 'blue' },
  container: {
    flex: 1,
    height: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gender: { flexDirection: 'row' },
  signUp: {
    width: '50%',
  },
  textInput: {
    width: '100%',
    marginVertical: 10,
  },
});
