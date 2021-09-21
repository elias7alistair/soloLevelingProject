import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
  tasks: [],
  taskLoading: false,
  errors: false,
};
// const initialState = {
//   tasks: [
//     {
//       id: 1,
//       taskName: "get up",
//       priority: "high",
//       difficulty: "medium",
//       status: "active",
//     },
//     {
//       id: 2,
//       taskName: "start learning course",
//       priority: "high",
//       difficulty: "medium",
//       status: "active",
//     },
//     {
//       id: 3,
//       taskName: "read",
//       priority: "high",
//       difficulty: "medium",
//       status: "active",
//     },
//   ],
// };

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    requestGetTask(state) {
      state.taskLoading = true;
    },
    getTaskSuccess(state, action) {
      state.taskLoading = false;
      state.tasks = action.payload;
    },
    getTaskFailed(state, action) {
      state.taskLoading = false;
      state.errors = action.payload;
    },
    requestDeleteTask(state) {
      state.taskLoading = true;
    },
    deleteTaskSuccess(state, action) {
      state.taskLoading = false;
       state.tasks = action.payload;
    },
    deleteTaskFailed(state, action) {
      state.taskLoading = false;
      state.errors = action.payload;
    },
    requestAddTask(state) {
      state.taskLoading = true;
    },
    addTaskSuccess(state, action) {
      state.taskLoading = false;
      state.tasks = updateId([...state.tasks, action.payload]);
      //  console.log(action.payload);
    },
    addTaskFailed(state, action) {
      state.taskLoading = false;
      state.errors = action.payload;
    },
    // addTask(state, action) {
    //   state.tasks = updateId([...state.tasks, action.payload]);
    //   console.log(action.payload);
    // },
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

export const {
  removeTask,
  updateTasks,
  requestGetTask,
  getTaskSuccess,
  getTaskFailed,
  requestDeleteTask,
  deleteTaskSuccess,
  deleteTaskFailed,
  addTaskFailed,
  requestAddTask,
  addTaskSuccess,
} = taskSlice.actions;

export default taskSlice.reducer;

export const getTasks = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(requestGetTask);
      const {
        input: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/quests/myquests`,config);
      dispatch(getTaskSuccess(data));
    } catch (error) {
      dispatch(
        getTaskFailed(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export const deleteTask = ({id}) => {
  return async (dispatch, getState) => {
    try {
      dispatch(requestDeleteTask());
      const {
        input: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.delete(`/api/quests/${id}`, config);

      dispatch(deleteTaskSuccess(data));
    } catch (error) {
      dispatch(
        deleteTaskFailed(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};
export const addTask = (task) => {
  return async (dispatch, getState) => {
    try {
      dispatch(requestAddTask());
      const {
        input: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/quests`, task, config);

      dispatch(addTaskSuccess(data));
    } catch (error) {
      dispatch(
        addTaskFailed(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};
