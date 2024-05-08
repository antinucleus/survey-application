import { StyleSheet, View } from 'react-native';
import { HelperText, Text, TextInput, useTheme } from 'react-native-paper';
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
          error={min >= max}
        />
        <HelperText type="error" visible={min >= max}>
          Min value must be smaller than max value{' '}
        </HelperText>
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
          error={min >= max}
        />
        <HelperText type="error" visible={min >= max}>
          Max value must be greater than min value
        </HelperText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: { flexDirection: 'row' },
  maxValueTextInput: { width: '100%' },
  minValueTextInput: { width: '100%' },
  sliderTitle: { marginBottom: 10 },
  textInputContainer: { marginVertical: 5, width: '100%' },
});
