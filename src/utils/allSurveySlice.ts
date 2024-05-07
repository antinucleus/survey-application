import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { dummySurveys } from '@/features/survey/utils/dummySurvey';

export type Survey = {
  title: string;
  survey: any;
};

export interface AllSurveyState {
  surveys: Survey[];
}

const initialState: AllSurveyState = {
  surveys: [...dummySurveys],
};

export const allSurveySlice = createSlice({
  name: 'allSurvey',
  initialState,
  reducers: {
    addSurvey: (state, action: PayloadAction<Survey>) => {
      state.surveys.unshift(action.payload);
    },

    deleteQuestion: (state, action: PayloadAction<number>) => {
      state.surveys.splice(action.payload, 1);
    },
    setSurveys: (state, action: PayloadAction<Survey[]>) => {
      state.surveys = action.payload;
    },
  },
});

export const { addSurvey, deleteQuestion, setSurveys } = allSurveySlice.actions;
export default allSurveySlice.reducer;
