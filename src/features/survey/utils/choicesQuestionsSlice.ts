import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { ChoiceOptionTypes } from '../types';

export interface ChoicesQuestionState {
  choices: {
    values: string[];
    question: string;
    multipleSelection: boolean;
    optionType: ChoiceOptionTypes;
  };
}

const initialState: ChoicesQuestionState = {
  choices: { values: [], question: '', multipleSelection: false, optionType: 'Radio Button' },
};

export const choicesQuestionSlice = createSlice({
  name: 'choicesQuestion',
  initialState,
  reducers: {
    addChoice: (state, action: PayloadAction<string>) => {
      state.choices.values.push(action.payload);
    },
    deleteChoice: (state, action: PayloadAction<number>) => {
      state.choices.values.splice(action.payload, 1);
    },
    updateChoice: (state, action: PayloadAction<{ value: string; index: number }>) => {
      const { value, index } = action.payload;
      state.choices.values[index] = value;
    },
    updateMultipleChoice: (state) => {
      state.choices.multipleSelection = !state.choices.multipleSelection;
    },

    updateChoiceOptionType: (state, action: PayloadAction<ChoiceOptionTypes>) => {
      state.choices.optionType = action.payload;
    },
    updateQuestion: (state, action: PayloadAction<string>) => {
      state.choices.question = action.payload;
    },
    setChoices: (state, action: PayloadAction<ChoicesQuestionState>) => {
      state.choices = action.payload.choices;
      console.log('Its is sett:', state.choices);
    },
    resetChoices: (state) => {
      state.choices = initialState.choices;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addChoice,
  deleteChoice,
  updateChoice,
  updateQuestion,
  updateChoiceOptionType,
  updateMultipleChoice,
  setChoices,
  resetChoices,
} = choicesQuestionSlice.actions;
export default choicesQuestionSlice.reducer;
