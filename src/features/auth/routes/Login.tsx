import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Surface, Text, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { PublicRoutesScreenNavigationProp } from '@/types';
import { updateAuth } from '@/utils/authSlice';

export const Login = () => {
  const navigation = useNavigation<PublicRoutesScreenNavigationProp>();
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const handleNicknameChange = (e: string) => setNickname(e);
  const handlePasswordChange = (e: string) => setPassword(e);
  const handleTextInputPress = () => setShowPassword(!showPassword);
  const handleSignIn = () => {
    dispatch(updateAuth(true));
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
