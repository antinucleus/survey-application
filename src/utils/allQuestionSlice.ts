import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { QuestionTypes } from '@/features/survey/types';
import { ChoicesQuestionState } from '@/features/survey/utils/choicesQuestionsSlice';
import { OpenEndedQuestionState } from '@/features/survey/utils/openEndedQuestionSlice';
import { SliderQuestionState } from '@/features/survey/utils/sliderQuestionSlice';

type Question = {
  key: number;
  type: QuestionTypes;
  question: ChoicesQuestionState | SliderQuestionState | OpenEndedQuestionState;
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
      let duplicated = false;
      const q = action.payload;

      for (let i = 0; i < state.questions.length; i++) {
        if (state.questions[i].key === q.key) {
          duplicated = true;
          state.questions[i].question = q.question;
          state.questions[i].type = q.type;

          break;
        }
      }
      if (duplicated === false) {
        state.questions.push(q);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addQuetion } = allQuestionSlice.actions;
export default allQuestionSlice.reducer;
