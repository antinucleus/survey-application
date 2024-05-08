import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, Surface, Text, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { login } from '../api';

import { USER_NAME } from '@/config';
import { PublicRoutesScreenNavigationProp } from '@/types';
import { updateAuth } from '@/utils/authSlice';
import { saveItem } from '@/utils/storage';
import { updateUserNickName } from '@/utils/userInfoSlice';

export const Login = () => {
  const navigation = useNavigation<PublicRoutesScreenNavigationProp>();
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleNicknameChange = (e: string) => setNickname(e);
  const handlePasswordChange = (e: string) => setPassword(e);
  const handleTextInputPress = () => setShowPassword(!showPassword);
  const handleSignIn = async () => {
    setLoading(true);
    try {
      const res = await login({ password: '23', username: 'wefsf' });
      if (res.status === 200) {
        const saved = await saveItem(USER_NAME, nickname);

        if (saved) {
          setTimeout(() => {
            setLoading(false);
            dispatch(updateUserNickName(nickname));
            dispatch(updateAuth(true));
          }, 200);
        }
      }
    } catch (error) {
      console.log('ERROR', error);
    }
  };
  const handleCreateAccount = () => navigation.navigate('SignUp');

  return (
    <Surface style={styles.container}>
      <TextInput
        label="Nickname"
        mode="outlined"
        style={styles.textInput}
        value={nickname}
        onChangeText={handleNicknameChange}
        error={nickname === ''}
      />
      <HelperText style={styles.helperText} type="error" visible={nickname === ''}>
        Nickname can not be empty{' '}
      </HelperText>

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
        error={password === ''}
      />
      <HelperText style={styles.helperText} type="error" visible={password === ''}>
        Password can not be empty{' '}
      </HelperText>

      <Button
        style={styles.signIn}
        mode="contained"
        loading={loading}
        disabled={nickname === '' || password === '' || loading}
        onPress={handleSignIn}>
        Sign In
      </Button>

      <View style={styles.bottomText}>
        <Text>Üye değil misiniz?</Text>
        <Button
          compact
          mode="text"
          rippleColor="rgba(0, 0, 255, 0.05)"
          textColor="blue"
          onPress={handleCreateAccount}>
          Hesap Oluştur
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
  helperText: { alignSelf: 'flex-start' },
  passwordTextInputStyle: { marginTop: 10 },
  signIn: {
    width: '50%',
    marginTop: 20,
  },
  textInput: {
    width: '100%',
  },
});
