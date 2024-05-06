import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, TextInput, useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import { updateSlider } from '../utils/sliderQuestionSlice';

import { RootState } from '@/stores/appStore';

export const SliderQuestionCreator = () => {
  const { dark } = useTheme();
  const dispatch = useDispatch();
  const { max, min } = useSelector((state: RootState) => state.sliderQuestion.slider.values);

  const handleOnMinimumValueChange = (e: string) => dispatch(updateSlider({ min: Number(e) }));
  const handleOnMaximumValueChange = (e: string) => dispatch(updateSlider({ max: Number(e) }));

  return (
    <View style={[styles.container, { backgroundColor: dark ? 'black' : 'white' }]}>
      <View style={styles.textInputContainer}>
        <Text style={styles.sliderTitle}>Slider minimum value</Text>
        <TextInput
          style={styles.minValueTextInput}
          maxLength={5}
          inputMode="numeric"
          label="Minimum value"
          value={String(min)}
          onChangeText={handleOnMinimumValueChange}
        />
      </View>

      <View style={styles.textInputContainer}>
        <Text style={styles.sliderTitle}>Slider maximum value</Text>
        <TextInput
          style={styles.maxValueTextInput}
          mode="flat"
          maxLength={5}
          inputMode="numeric"
          label="Maximum value"
          value={String(max)}
          onChangeText={handleOnMaximumValueChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  maxValueTextInput: { width: '100%' },
  minValueTextInput: { width: '100%' },
  sliderTitle: { marginBottom: 10 },
  textInputContainer: { marginVertical: 5, alignItems: 'center' },
});
