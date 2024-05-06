import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const MAX_CHARACTER_LENGTH = 100;
export interface OpenEndedQuestionState {
  openEnded: { question: string; values: { maxLength: number } };
}

const initialState: OpenEndedQuestionState = {
  openEnded: { question: '', values: { maxLength: MAX_CHARACTER_LENGTH } },
};

export const openEndedQuestionSlice = createSlice({
  name: 'openEndedQuestion',
  initialState,
  reducers: {
    updateMaxLength: (state, action: PayloadAction<number>) => {
      state.openEnded.values.maxLength = action.payload;
    },
    updateQuestion: (state, action: PayloadAction<string>) => {
      state.openEnded.question = action.payload;
    },
    setOpenEnded: (state, action: PayloadAction<OpenEndedQuestionState>) => {
      state.openEnded = action.payload.openEnded;
    },
    resetOpenEnded: (state) => {
      state.openEnded = initialState.openEnded;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateMaxLength, updateQuestion, setOpenEnded, resetOpenEnded } =
  openEndedQuestionSlice.actions;
export default openEndedQuestionSlice.reducer;
