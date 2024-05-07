import { SURVEY_ANSWERS } from '@/config';

export const formatStorageKey = (value: string) => SURVEY_ANSWERS.concat(value.split(' ').join(''));
