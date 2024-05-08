import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserInfoState {
  nickname: string;
  mail: string;
  gender: 'Male' | 'Female';
}

const initialState: UserInfoState = {
  gender: 'Male',
  mail: '',
  nickname: '',
};

export const userInfoSlice = createSlice({
  name: 'userinfo',
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<UserInfoState>) => {
      state = action.payload;
    },
    updateUserNickName: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
  },
});

export const { updateUserInfo, updateUserNickName } = userInfoSlice.actions;
export default userInfoSlice.reducer;
