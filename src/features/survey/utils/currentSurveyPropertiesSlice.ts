import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { QuestionOperation } from './currentQuestionPropertiesSlice';

export interface CurrentSurveyPropertiesState {
  surveyKey: number;
}

const initialState: CurrentSurveyPropertiesState = {
  surveyKey: 0,
};

export const currentSurveyPropertiesSlice = createSlice({
  name: 'currentSurveyProperties',
  initialState,
  reducers: {
    updateCurrentSurveyKey: (state, action: PayloadAction<number>) => {
      state.surveyKey = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCurrentSurveyKey } = currentSurveyPropertiesSlice.actions;
export default currentSurveyPropertiesSlice.reducer;
