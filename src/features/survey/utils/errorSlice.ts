import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ErrorState {
  choiceErrors: boolean[];
  sliderErrors: boolean[];
  openEndedErrors: boolean[];
  emptyError: boolean;
}

type Keys = keyof ErrorState;

const initialState: ErrorState = {
  choiceErrors: [],
  sliderErrors: [],
  openEndedErrors: [],
  emptyError: true,
};

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    updateEmptyError: (state, action: PayloadAction<boolean>) => {
      state.emptyError = action.payload;
    },
    addError: (state, action: PayloadAction<keyof ErrorState>) => {
      const key = action.payload;
      state[key].push(true);
    },
    removeError: (state, action: PayloadAction<{ key: Keys; index: number }>) => {
      const { key, index } = action.payload;
      state[key].splice(index, 1);
    },
    resetError: (state) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addError, removeError, resetError, updateEmptyError } = errorSlice.actions;
export default errorSlice.reducer;
