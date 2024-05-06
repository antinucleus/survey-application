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

export interface AllAnswerState {
  answers: Question[];
}

const initialState: AllAnswerState = {
  answers: [
    {
      question: { openEnded: { question: 'Open ended 1', values: { maxLength: 10 } } },
      type: 'Open-ended Question',
    },
    {
      question: { slider: { question: 'Slider 1', values: { max: 20, min: 10 } } },
      type: 'Slider',
    },
    {
      question: {
        choices: {
          multipleSelection: false,
          optionType: 'Check Box',
          question: 'Single Choie',
          values: ['Yes', 'No'],
        },
      },
      type: 'Multiple Choice',
    },
    {
      question: {
        choices: {
          multipleSelection: true,
          optionType: 'Radio Button',
          question:
            'Multiple choice 1 bu bir denemdir daha uzun bir soru gelirse ona göre kendisni optimize etmelidir',
          values: [
            'C1fsaffffffafafafafadfaf adf afa affasf  a adsfdfabfasfsffsafa fas fa adsfad fa ewrewrw  t et e t',
            'C2',
            'C3',
          ],
        },
      },
      type: 'Multiple Choice',
    },
  ],
};

export const allQuestionSlice = createSlice({
  name: 'allQuestion',
  initialState,
  reducers: {
    addQuetion: (state, action: PayloadAction<Question>) => {
      const q = action.payload;

      state.answers.unshift(q);
    },
    updateQuestion: (state, action: PayloadAction<{ q: Question; questionIndex: number }>) => {
      const { questionIndex, q } = action.payload;
      state.answers[questionIndex] = q;
    },
    deleteQuestion: (state, action: PayloadAction<number>) => {
      state.answers.splice(action.payload, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addQuetion, updateQuestion, deleteQuestion } = allQuestionSlice.actions;
export default allQuestionSlice.reducer;
