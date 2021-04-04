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
  },
});

export const { getTasks } = taskSlice.actions;

export default taskSlice.reducer;
