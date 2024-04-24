import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  name: '',
  grade: 0,
  class: 0,
  id: 0,
  admin: false,
  loading: true,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const { username, realName, schoolGrade, schoolClass, schoolId, admin } =
        action.payload;

      state.username = username;
      state.name = realName;
      state.grade = schoolGrade;
      state.class = schoolClass;
      state.id = schoolId;
      state.admin = admin;
      state.loading = false;
    },

    logout: (state) => {
      state.username = initialState.username;
      state.name = initialState.name;
      state.grade = initialState.grade;
      state.class = initialState.class;
      state.id = initialState.id;
      state.admin = initialState.isAdmin;
    },

    setLoading: (state, action) => {
      state.loading = action.payload.loading;
    },

    setError: (state, action) => {
      state.error = action.payload.error;
    },
  },
});

export const { setUserData, logout, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;
