import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';

import { useTheme } from './src/hooks';
import { store } from './src/stores/appStore';

import { StatusBar } from '@/components';
import { CreateSurvey } from '@/features/survey/routes/CreateSurvey';
export const App = (): React.JSX.Element => {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <StatusBar />
          <SafeAreaView style={styles.container}>
            <CreateSurvey />
          </SafeAreaView>
        </PaperProvider>
      </Provider>
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
