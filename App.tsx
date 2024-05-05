import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import { useTheme } from './src/hooks';
import { Routes } from './src/routes';

import { StatusBar } from '@/components';
import { CreateSurvey } from '@/features/survey/routes/CreateSurvey';

export const App = (): React.JSX.Element => {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <StatusBar />
        <SafeAreaView style={styles.container}>
          <CreateSurvey />
        </SafeAreaView>
      </PaperProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
});

export default App;
