import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    { id: 1, taskName: "get up", priority: "high", difficulty: "medium" },
    {
      id: 2,
      taskName: "start learning course",
      priority: "high",
      difficulty: "medium",
    },
    { id: 3, taskName: "read", priority: "high", difficulty: "medium" },
  ],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    getTasks(state) {
      return state;
    },
    addTask(state, action) {
      state.tasks = [...state.tasks, action.payload];
    },
  },
});

export const { getTasks, addTask } = taskSlice.actions;

export default taskSlice.reducer;
