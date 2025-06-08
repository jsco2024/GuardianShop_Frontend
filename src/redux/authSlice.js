import { createSlice } from '@reduxjs/toolkit';

const persistedAuthState = localStorage.getItem('isAuthenticated') === 'true';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: persistedAuthState,
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.setItem('isAuthenticated', 'false');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;