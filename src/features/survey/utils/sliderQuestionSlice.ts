import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SliderQuestionState {
  slider: { values: { min: number; max: number }; question: string };
}

const initialState: SliderQuestionState = {
  slider: { values: { min: 0, max: 0 }, question: '' },
};

export const sliderQuestionSlice = createSlice({
  name: 'sliderQuestion',
  initialState,
  reducers: {
    updateSlider: (state, action: PayloadAction<{ min?: number; max?: number }>) => {
      const { max, min } = action.payload;
      if (min) {
        state.slider.values.min = min;
      }

      if (max) {
        state.slider.values.max = max;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSlider } = sliderQuestionSlice.actions;
export default sliderQuestionSlice.reducer;
