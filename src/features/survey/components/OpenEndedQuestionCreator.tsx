import { StyleSheet, View } from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import { updateMaxLength } from '../utils/openEndedQuestionSlice';

import { RootState } from '@/stores/appStore';

export const OpenEndedQuestionCreator = () => {
  const { dark } = useTheme();
  const dispatch = useDispatch();
  const { maxLength } = useSelector((state: RootState) => state.openEndedQuestion.openEnded.values);

  const handleOnMaxLengthValueChange = (e: string) => {
    if (e.includes('.')) return;

    const eToNum = Number(e);
    if (isNaN(eToNum) || eToNum <= 0) return;

    dispatch(updateMaxLength(eToNum));
  };

  return (
    <View style={[styles.container, { backgroundColor: dark ? 'black' : 'white' }]}>
      <View style={styles.textInputContainer}>
        <Text style={styles.openEndedTitle}>Open-ended question maximum character value</Text>
        <TextInput
          style={styles.maxLengthValueTextInput}
          maxLength={5}
          inputMode="numeric"
          label="Maximum length"
          value={String(maxLength)}
          onChangeText={handleOnMaxLengthValueChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  maxValueTextInput: { width: '100%' },
  maxLengthValueTextInput: { width: '100%' },
  openEndedTitle: { marginBottom: 10, alignSelf: 'flex-start' },
  textInputContainer: { marginVertical: 5, alignItems: 'center' },
});
