import { configureStore } from '@reduxjs/toolkit';

import choicesQuestionReducer from '@/features/survey/utils/choicesQuestionsSlice';
import currentQuestionPropertiesReducer from '@/features/survey/utils/currentQuestionPropertiesSlice';
import openEndedQuestionReducer from '@/features/survey/utils/openEndedQuestionSlice';
import sliderQuestionReducer from '@/features/survey/utils/sliderQuestionSlice';
import allQuestionReducer from '@/utils/allQuestionSlice';

export const store = configureStore({
  reducer: {
    choicesQuestion: choicesQuestionReducer,
    sliderQuestion: sliderQuestionReducer,
    currentQuestionProperties: currentQuestionPropertiesReducer,
    openEndedQuestion: openEndedQuestionReducer,
    allQuestion: allQuestionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
