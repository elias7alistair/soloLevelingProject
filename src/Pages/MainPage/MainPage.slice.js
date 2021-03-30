import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    { id: 1, taskName: "get up", prioritity: "high", difficulty: "medium" },
  ],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    getTasks(state) {
      return state;
    },
  },
});

export const { getTasks } = taskSlice.actions;

export default taskSlice.reducer;
