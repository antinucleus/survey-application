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
  questions: [
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
          question: 'Single selection question test example',
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
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus commodo faucibus enim sed molestie. Duis eleifend sapien quis lorem vestibulum consequat. Sed mollis sapien eget mollis aliquet. Nunc dictum aliquam purus sit amet finibus. Nam ut magna sed ex scelerisque egestas. Proin consectetur, urna aliquam pulvinar pretium, orci ante tincidunt nunc, vitae euismod turpis lectus at lectus. Praesent pretium ligula dui, sit amet ornare felis congue eget. Pellentesque ullamcorper nisi neque. Mauris a turpis cursus, hendrerit odio quis, finibus enim. Pellentesque pulvinar risus eget iaculis aliquet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In molestie. ',
          values: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida lacus risus, finibus sagittis nibh tristique vel. Vivamus sit amet. ',
            'Maecenas sagittis tellus eget elit sodales, posuere pellentesque leo imperdiet. Etiam accumsan. ',
            'Nam bibendum neque nec ante posuere ultricies. Mauris sed congue odio. Curabitur eget tristique dui. Aenean porttitor malesuada turpis, a. ',
            'Nullam euismod quam sed diam rutrum, ut vulputate ex blandit. Ut viverra non massa eu elementum. Nulla lobortis enim non. ',
            'Integer a turpis tortor. Curabitur ac quam rutrum, facilisis enim a, tincidunt quam. Ut elementum sit amet nulla in pharetra. ',
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
