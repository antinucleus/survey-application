import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { QuestionTypes } from '../types';

type QuestionOperation = 'Add' | 'Update';

export interface CurrentQuestionPropertiesState {
  questionType: QuestionTypes;
  questionKey: number;
  questionOperation: QuestionOperation;
}

const initialState: CurrentQuestionPropertiesState = {
  questionType: '' as QuestionTypes,
  questionKey: 0,
  questionOperation: 'Add',
};

export const currentQuestionPropertiesSlice = createSlice({
  name: 'currentQuestionProperties',
  initialState,
  reducers: {
    updateCurrentQuestionType: (state, action: PayloadAction<QuestionTypes>) => {
      state.questionType = action.payload;
    },
    updateCurrentQuestionKey: (state, action: PayloadAction<number>) => {
      state.questionKey = action.payload;
    },
    updateCurrentQuestionOperation: (state, action: PayloadAction<QuestionOperation>) => {
      state.questionOperation = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateCurrentQuestionType,
  updateCurrentQuestionKey,
  updateCurrentQuestionOperation,
} = currentQuestionPropertiesSlice.actions;
export default currentQuestionPropertiesSlice.reducer;
