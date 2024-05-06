import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { QuestionTypes } from '@/features/survey/types';
import { ChoicesQuestionState } from '@/features/survey/utils/choicesQuestionsSlice';
import { OpenEndedQuestionState } from '@/features/survey/utils/openEndedQuestionSlice';
import { SliderQuestionState } from '@/features/survey/utils/sliderQuestionSlice';

export type QuestionStates = ChoicesQuestionState | SliderQuestionState | OpenEndedQuestionState;

export type Question = {
  type: QuestionTypes;
  question: QuestionStates;
};

export interface AllQuestionState {
  questions: Question[];
}

const initialState: AllQuestionState = {
  questions: [],
};

export const allQuestionSlice = createSlice({
  name: 'allQuestion',
  initialState,
  reducers: {
    addQuetion: (state, action: PayloadAction<Question>) => {
      const q = action.payload;

      state.questions.unshift(q);
    },
    updateQuestion: (state, action: PayloadAction<{ q: Question; questionIndex: number }>) => {
      const { questionIndex, q } = action.payload;
      state.questions[questionIndex] = q;
    },
    deleteQuestion: (state, action: PayloadAction<number>) => {
      state.questions.splice(action.payload, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addQuetion, updateQuestion, deleteQuestion } = allQuestionSlice.actions;
export default allQuestionSlice.reducer;
