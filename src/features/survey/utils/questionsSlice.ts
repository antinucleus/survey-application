import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface QuestionState {
  choices: { values: string[]; question: string; multipleChoice: boolean };
}

const initialState: QuestionState = {
  choices: { values: [], question: '', multipleChoice: false },
};

export const questionSlice = createSlice({
  name: 'question',
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
      state.choices.multipleChoice = !state.choices.multipleChoice;
    },
    updateQuestion: (state, action: PayloadAction<string>) => {
      state.choices.question = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addChoice, deleteChoice, updateChoice, updateQuestion, updateMultipleChoice } =
  questionSlice.actions;
export default questionSlice.reducer;
