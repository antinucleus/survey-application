import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { CheckBoxStatus, QuestionTypes, RadioStatus } from '@/features/survey/types';

type AnswerTypes = RadioStatus | CheckBoxStatus[] | boolean[] | string | number;

export type SingleAnswer = {
  answer: AnswerTypes;
  type: QuestionTypes;
};

export type SurveyAnswer = {
  title: string;
  surveyAnswers: SingleAnswer[];
};

export interface AllAnswerState {
  answers: SurveyAnswer[];
}

const initialState: AllAnswerState = {
  answers: [],
};

export const allAnswerSlice = createSlice({
  name: 'allAnswer',
  initialState,
  reducers: {
    addEmptyAnswer: (state, action: PayloadAction<SurveyAnswer>) => {
      state.answers.push(action.payload);
    },
    initAnswer: (state, action: PayloadAction<SurveyAnswer[]>) => {
      for (const sa of action.payload) {
        state.answers.push(sa);
      }
    },
    updateAllAnswer: (
      state,
      action: PayloadAction<{ answer: SingleAnswer; answerIndex: number; surveyIndex: number }>,
    ) => {
      const { answerIndex, answer, surveyIndex } = action.payload;

      if (state.answers[surveyIndex].surveyAnswers[answerIndex] === undefined) {
        state.answers[surveyIndex].surveyAnswers.push(answer);
      } else {
        state.answers[surveyIndex].surveyAnswers[answerIndex] = answer;
      }
    },
    setAllAnswer: (state, action: PayloadAction<SurveyAnswer[]>) => {
      state.answers = action.payload;
    },

    resetAllAnswer: (state) => {
      state = initialState;
    },
  },
});

export const { updateAllAnswer, setAllAnswer, resetAllAnswer, initAnswer, addEmptyAnswer } =
  allAnswerSlice.actions;
export default allAnswerSlice.reducer;
