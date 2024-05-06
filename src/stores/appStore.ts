import { configureStore } from '@reduxjs/toolkit';

import choicesQuestionReducer from '@/features/survey/utils/choicesQuestionsSlice';
import currentQuestionPropertiesReducer from '@/features/survey/utils/currentQuestionPropertiesSlice';
import sliderQuestionReducer from '@/features/survey/utils/sliderQuestionSlice';

export const store = configureStore({
  reducer: {
    choicesQuestion: choicesQuestionReducer,
    sliderQuestion: sliderQuestionReducer,
    currentQuestionProperties: currentQuestionPropertiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
