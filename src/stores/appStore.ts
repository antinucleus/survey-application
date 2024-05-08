import { configureStore } from '@reduxjs/toolkit';

import choicesQuestionReducer from '@/features/survey/utils/choicesQuestionsSlice';
import currentQuestionPropertiesReducer from '@/features/survey/utils/currentQuestionPropertiesSlice';
import currentSurveyPropertiesReducer from '@/features/survey/utils/currentSurveyPropertiesSlice';
import errorReducer from '@/features/survey/utils/errorSlice';
import openEndedQuestionReducer from '@/features/survey/utils/openEndedQuestionSlice';
import sliderQuestionReducer from '@/features/survey/utils/sliderQuestionSlice';
import allAnswerReducer from '@/utils/allAnswerSlice';
import allQuestionReducer from '@/utils/allQuestionSlice';
import allSurveyReducer from '@/utils/allSurveySlice';
import authReducer from '@/utils/authSlice';

export const store = configureStore({
  reducer: {
    choicesQuestion: choicesQuestionReducer,
    sliderQuestion: sliderQuestionReducer,
    currentQuestionProperties: currentQuestionPropertiesReducer,
    currentSurveyProperties: currentSurveyPropertiesReducer,
    openEndedQuestion: openEndedQuestionReducer,
    allQuestion: allQuestionReducer,
    allAnswer: allAnswerReducer,
    allSurvey: allSurveyReducer,
    error: errorReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
