import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { CheckBoxStatus, QuestionTypes, RadioStatus } from '@/features/survey/types';

type AnswerTypes = RadioStatus | CheckBoxStatus[] | boolean[] | string | number;

export type SingleAnswer = {
  answer?: AnswerTypes;
  type: QuestionTypes;
};

export type SurveyAnswer = {
  surveyAnswers: SingleAnswer[];
};

const initialState: SurveyAnswer[] = [];

export const allAnswerSlice = createSlice({
  name: 'allAnswer',
  initialState,
  reducers: {
    addEmptyAnswer: (
      state,
      action: PayloadAction<{ answer: SingleAnswer; surveyIndex: number; answerIndex: number }>,
    ) => {
      const { surveyIndex, answer, answerIndex } = action.payload;

      if (state[surveyIndex].surveyAnswers[answerIndex] === undefined) {
        state[surveyIndex].surveyAnswers.push(answer);
      }
    },

    initSingleAnswer: (state, action: PayloadAction<SurveyAnswer>) => {
      state.push(action.payload);
    },

    initAnswer: (state, action: PayloadAction<SurveyAnswer[]>) => {
      for (const sa of action.payload) {
        state.push(sa);
      }
    },

    updateAllAnswer: (
      state,
      action: PayloadAction<{ answer: SingleAnswer; answerIndex: number; surveyIndex: number }>,
    ) => {
      const { answerIndex, answer, surveyIndex } = action.payload;

      if (state[surveyIndex].surveyAnswers[answerIndex] === undefined) {
        state[surveyIndex].surveyAnswers.push(answer);
      } else {
        state[surveyIndex].surveyAnswers[answerIndex] = answer;
      }
    },

    setAllAnswer: (state, action: PayloadAction<SurveyAnswer[]>) => {
      state = action.payload;
    },

    resetAllAnswer: (state) => {
      state = initialState;
    },
  },
});

export const {
  updateAllAnswer,
  setAllAnswer,
  resetAllAnswer,
  initAnswer,
  initSingleAnswer,
  addEmptyAnswer,
} = allAnswerSlice.actions;

export default allAnswerSlice.reducer;
