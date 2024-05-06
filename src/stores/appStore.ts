import { configureStore } from '@reduxjs/toolkit';

import choiceAnswerReducer from '@/features/survey/utils/choiceAnswerSlice';
import choicesQuestionReducer from '@/features/survey/utils/choicesQuestionsSlice';
import currentQuestionPropertiesReducer from '@/features/survey/utils/currentQuestionPropertiesSlice';
import openEndedQuestionReducer from '@/features/survey/utils/openEndedQuestionSlice';
import sliderQuestionReducer from '@/features/survey/utils/sliderQuestionSlice';
import allAnswerReducer from '@/utils/allAnswerSlice';
import allQuestionReducer from '@/utils/allQuestionSlice';

export const store = configureStore({
  reducer: {
    choicesQuestion: choicesQuestionReducer,
    choiceAnswer: choiceAnswerReducer,
    sliderQuestion: sliderQuestionReducer,
    currentQuestionProperties: currentQuestionPropertiesReducer,
    openEndedQuestion: openEndedQuestionReducer,
    allQuestion: allQuestionReducer,
    allAnswer: allAnswerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
