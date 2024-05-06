import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ChoicesQuestionState {
  choices: { values: string[]; question: string; multipleSelection: boolean };
}

const initialState: ChoicesQuestionState = {
  choices: { values: [], question: '', multipleSelection: false },
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
    updateQuestion: (state, action: PayloadAction<string>) => {
      state.choices.question = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addChoice, deleteChoice, updateChoice, updateQuestion, updateMultipleChoice } =
  choicesQuestionSlice.actions;
export default choicesQuestionSlice.reducer;
