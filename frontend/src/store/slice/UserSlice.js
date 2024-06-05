import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  id: null,
  isAuth: false,
  lastName: null,
  firstName: null,
  phone: null,
  birthday: null,
  role: null,
};

export const userSlise = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, actions) {
      state.email = actions.payload.email;
      state.id = actions.payload.id;
      state.isAuth = true;
      state.lastName = actions.payload.lastName;
      state.firstName = actions.payload.firstName;
      state.birthday = actions.payload.birthday;
      state.phone = actions.payload.phone;
      state.role = actions.payload.role;
    },
    logout(state) {
      state.email = null;
      state.id = null;
      state.isAuth = false;
      state.lastName = null;
      state.firstName = null;
      state.birthday = null;
      state.phone = null;
      state.role = null;
    },
  },
});

export const { login, logout } = userSlise.actions;

export default userSlise.reducer;
