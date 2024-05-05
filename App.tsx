import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import { useTheme } from './src/hooks';
import { Routes } from './src/routes';

import { StatusBar } from '@/components';

export const App = (): React.JSX.Element => {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <StatusBar />
        <SafeAreaView style={styles.container}>
          <Routes />
        </SafeAreaView>
      </PaperProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
