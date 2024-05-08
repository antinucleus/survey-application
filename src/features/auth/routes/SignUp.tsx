import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { signUp } from '../api';

import { PublicRoutesScreenNavigationProp } from '@/types';
import { updateUserInfo } from '@/utils/userInfoSlice';

export const SignUp = () => {
  const navigation = useNavigation<PublicRoutesScreenNavigationProp>();
  const dispatch = useDispatch();
  const [gender, setGender] = useState(0);
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const handleEmailChange = (e: string) => setEmail(e);
  const handleNicknameChange = (e: string) => setNickname(e);
  const handlePasswordChange = (e: string) => setPassword(e);
  const handleTextInputPress = () => setShowPassword(!showPassword);
  const handleLogin = () => navigation.goBack();
  const handleGenderChange = (gender: number) => setGender(gender);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const res = await signUp({ password: '12345', username: 'test', mail: 'test' });
      if (res.status === 200) {
        setTimeout(() => {
          setLoading(false);
          dispatch(
            updateUserInfo({ gender: gender === 0 ? 'Male' : 'Female', mail: email, nickname }),
          );
          navigation.navigate('Login');
        }, 200);
      }
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  return (
    <Surface style={styles.container}>
      <Text>Cinsiyetinizi Seçiniz</Text>
      <View style={styles.gender}>
        <Button onPress={() => handleGenderChange(0)} mode={gender === 0 ? 'contained' : 'text'}>
          Erkek
        </Button>
        <Button onPress={() => handleGenderChange(1)} mode={gender === 1 ? 'contained' : 'text'}>
          {' '}
          Kadın
        </Button>
      </View>
      <TextInput
        label="Email"
        mode="outlined"
        style={styles.textInput}
        value={email}
        error={email === ''}
        onChangeText={handleEmailChange}
      />
      <HelperText style={styles.helperText} type="error" visible={email === ''}>
        Email can not be empty
      </HelperText>

      <TextInput
        label="Nickname"
        mode="outlined"
        style={styles.textInput}
        value={nickname}
        onChangeText={handleNicknameChange}
        error={nickname === ''}
      />
      <HelperText style={styles.helperText} type="error" visible={nickname === ''}>
        Nickname can not be empty
      </HelperText>

      <TextInput
        label="Password"
        mode="outlined"
        value={password}
        style={styles.textInput}
        secureTextEntry={showPassword}
        onChangeText={handlePasswordChange}
        error={password === ''}
        right={
          <TextInput.Icon
            onPress={handleTextInputPress}
            icon={`${showPassword ? 'eye-off' : 'eye'}`}
          />
        }
      />

      <HelperText style={styles.helperText} type="error" visible={password === ''}>
        Password can not be empty
      </HelperText>

      <Button
        style={styles.signUp}
        mode="contained"
        onPress={handleSignUp}
        disabled={email === '' || password === '' || nickname === '' || loading}
        loading={loading}>
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
  gender: { flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginTop: 10 },
  helperText: { alignSelf: 'flex-start' },
  signUp: {
    width: '50%',
    marginTop: 10,
  },
  textInput: {
    width: '100%',
    marginVertical: 10,
  },
});
