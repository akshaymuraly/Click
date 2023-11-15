import { configureStore, createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: { isLoggedIn: false, loading: false },
  reducers: {
    adminLogin(state) {
      state.isLoggedIn = true;
    },
    adminLogout(state) {
      state.isLoggedIn = false;
    },
    adminStartLoading(state) {
      state.loading = true;
    },
    adminStopLoading(state) {
      state.loading = false;
    },
  },
});

const userSlice = createSlice({
  name: "user",
  initialState: { isLoggedIn: false, loading: false },
  reducers: {
    userLogin(state) {
      state.isLoggedIn = true;
    },
    userLogout(state) {
      state.isLoggedIn = false;
    },
    userStartLoading(state) {
      state.loading = true;
    },
    userStopLoading(state) {
      state.loading = false;
    },
  },
});

export const adminActions = adminSlice.actions;
export const userActions = userSlice.actions;

export const store = configureStore({
  reducer: {
    admin: adminSlice.reducer,
    user: userSlice.reducer,
  },
});
