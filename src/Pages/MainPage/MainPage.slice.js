import { createSlice } from "@reduxjs/toolkit";

const updateId = (list) => {
  list.map((data) => {
    return (data.id = list.findIndex(
      (list) => list.taskName === data.taskName
    ));
  });
  return list;
};

const filterTask = (list, id) => {
  return list.filter((task) => {
    return task.id !== id;
  });
};

const initialState = {
  tasks: [
    {
      id: 1,
      taskName: "get up",
      priority: "high",
      difficulty: "medium",
      status: "active",
    },
    {
      id: 2,
      taskName: "start learning course",
      priority: "high",
      difficulty: "medium",
      status: "active",
    },
    {
      id: 3,
      taskName: "read",
      priority: "high",
      difficulty: "medium",
      status: "active",
    },
  ],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks = updateId([...state.tasks, action.payload]);
      console.log(action.payload);
    },
    removeTask(state, action) {
      state.tasks = updateId(filterTask([...state.tasks], action.payload));
    },
    updateTasks(state, action) {
      const newTasks = state.tasks.map((data) => {
        if (data.id === action.payload) {
          data.status = "completed";
        }
        return data;
      });
      state.tasks = [...newTasks];
    },
  },
});

export const { getTasks, addTask, removeTask, updateTasks } = taskSlice.actions;

export default taskSlice.reducer;

// export const updateStatusCompleted = (id) => {
//   return async (dispatch, getState) => {
//     const { tasks } = getState().tasks;

//     const tempArray = [...tasks];

//     const tempArray2 = tempArray.map((data) => {
//       if (data.id === id) {
//         data.status = "completed";
//       }
//     });
//     dispatch(updateTasks(tempArray2));
//   };
// };
