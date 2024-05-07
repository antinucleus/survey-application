import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { ChoiceOptionTypes } from '../types';

export type RadioStatus = 'checked' | 'unchecked';
export type CheckBoxStatus = 'checked' | 'unchecked' | 'indeterminate';

export interface ChoicesAnswerState {
  radio: RadioStatus;
  checkBox: CheckBoxStatus[];
  button: boolean[];
}

const initialState: ChoicesAnswerState = {
  radio: 'unchecked',
  checkBox: [],
  button: [],
};

export const choicesAnswerSlice = createSlice({
  name: 'choicesAnswer',
  initialState,
  reducers: {
    updateAnswer: (
      state,
      action: PayloadAction<{
        choiceOptionType: ChoiceOptionTypes;
        answerIndex: number;
        value: RadioStatus | CheckBoxStatus | boolean;
      }>,
    ) => {
      const { value, choiceOptionType, answerIndex } = action.payload;

      if (choiceOptionType === 'Radio Button') {
        state.radio = value as RadioStatus;
      } else if (choiceOptionType === 'Check Box') {
        state.checkBox[answerIndex] = value as CheckBoxStatus;
      } else if (choiceOptionType === 'Button') {
        state.button[answerIndex] = value as boolean;
      }
    },

    setAnswer: (state, action: PayloadAction<ChoicesAnswerState>) => {
      state = action.payload;
    },
    resetAnswer: (state) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { resetAnswer, setAnswer, updateAnswer } = choicesAnswerSlice.actions;
export default choicesAnswerSlice.reducer;
