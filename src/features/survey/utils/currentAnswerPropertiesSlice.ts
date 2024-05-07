import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { QuestionOperation } from './currentQuestionPropertiesSlice';

export interface CurrentAnswerPropertiesState {
  answerKey: number;
  answerOperation: QuestionOperation;
}

const initialState: CurrentAnswerPropertiesState = {
  answerKey: 0,
  answerOperation: 'Add',
};

export const currentAnswerPropertiesSlice = createSlice({
  name: 'currentQuestionProperties',
  initialState,
  reducers: {
    updateCurrentAnswerKey: (state, action: PayloadAction<number>) => {
      state.answerKey = action.payload;
    },
    updateCurrentAnswerOperation: (state, action: PayloadAction<QuestionOperation>) => {
      state.answerOperation = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCurrentAnswerKey, updateCurrentAnswerOperation } =
  currentAnswerPropertiesSlice.actions;
export default currentAnswerPropertiesSlice.reducer;
