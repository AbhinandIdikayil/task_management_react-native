import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { removeToken, storeToken } from '../utils/tokenStorage';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      storeToken('token', action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
    loadToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { setToken, logout, loadToken } = authSlice.actions;
export default authSlice.reducer;