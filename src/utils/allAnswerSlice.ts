import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { CheckBoxStatus, QuestionTypes, RadioStatus } from '@/features/survey/types';

type AnswerTypes = RadioStatus | CheckBoxStatus[] | boolean[] | string | number;

export type Answer = {
  answer: AnswerTypes;
  type: QuestionTypes;
};

export interface AllAnswerState {
  answers: Answer[];
}

const initialState: AllAnswerState = {
  answers: [],
};

export const allAnswerSlice = createSlice({
  name: 'allAnswer',
  initialState,
  reducers: {
    updateAllAnswer: (state, action: PayloadAction<{ answer: Answer; answerIndex: number }>) => {
      const { answerIndex, answer } = action.payload;

      if (state.answers[answerIndex] === undefined) {
        state.answers.push(answer);
      } else {
        state.answers[answerIndex] = answer;
      }
    },
  },
});

export const { updateAllAnswer } = allAnswerSlice.actions;
export default allAnswerSlice.reducer;
