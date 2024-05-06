import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { QuestionTypes } from '../types';

export interface CurrentQuestionPropertiesState {
  questionType: QuestionTypes;
}

const initialState: CurrentQuestionPropertiesState = {
  questionType: '' as QuestionTypes,
};

export const currentQuestionPropertiesSlice = createSlice({
  name: 'currentQuestionProperties',
  initialState,
  reducers: {
    updateQuetionType: (state, action: PayloadAction<QuestionTypes>) => {
      state.questionType = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateQuetionType } = currentQuestionPropertiesSlice.actions;
export default currentQuestionPropertiesSlice.reducer;
