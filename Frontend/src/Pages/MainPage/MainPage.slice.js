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
  goals: [],
  taskLoading: false,
  goalsLoading: false,
  goalsErrors: false,
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
    requestGetGoals(state) {
      state.goalsLoading = true;
    },
    getGoalsSuccess(state, action) {
      state.goalsLoading = false;
      state.goals = action.payload;
    },
    getGoalsFailed(state, action) {
      state.goalsLoading = false;
      state.Goalserrors = action.payload;
    },
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
    requestGoalsStatus(state) {
      state.goalsLoading = true;
    },
    goalsStatusSuccess(state, action) {
      state.goalsLoading = false;
      console.log('hehehags123',action.payload)
      const newGoals = state.goals.map((data) => {
        if (data._id === action.payload._id) {
          data.isCompleted = action.payload.isCompleted;
        }
        return data;
      });
      state.goals = [...newGoals];
    },
    goalsStatusFailed(state, action) {
      state.goalsLoading = false;
      state.errors = action.payload;
    },
    requestTaskStatus(state) {
      state.taskLoading = true;
    },
    taskStatusSuccess(state, action) {
      state.taskLoading = false;
      console.log('hehehags123',action.payload)
      const newTasks = state.tasks.map((data) => {
        if (data._id === action.payload._id) {
          data.isCompleted = action.payload.isCompleted;
        }
        return data;
      });
      state.tasks = [...newTasks];
    },
    taskStatusFailed(state, action) {
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
    requestDeleteGoals(state) {
      state.goalsLoading = true;
    },
    deleteGoalsSuccess(state, action) {
      state.goalsLoading = false;
      state.goals = action.payload;
    },
    deleteGoalsFailed(state, action) {
      state.goalsLoading = false;
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
    requestAddGoals(state) {
      state.goalsLoading = true;
    },
    addGoalsSuccess(state, action) {
      state.goalsLoading = false;
      state.goals = updateId([...state.goals, action.payload]);
      //  console.log(action.payload);
    },
    addGoalsFailed(state, action) {
      state.goalsLoading = false;
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
  requestTaskStatus,
  taskStatusFailed,
  taskStatusSuccess,
  removeTask,
  updateTasks,
  requestGetGoals,
  getGoalsSuccess,
  getGoalsFailed,
  requestGetTask,
  getTaskSuccess,
  getTaskFailed,
  requestDeleteTask,
  deleteTaskSuccess,
  deleteTaskFailed,
  addTaskFailed,
  requestAddTask,
  addTaskSuccess,
  addGoalsFailed,addGoalsSuccess,requestAddGoals,goalsStatusFailed,requestGoalsStatus ,goalsStatusSuccess,deleteGoalsFailed,deleteGoalsSuccess,requestDeleteGoals
} = taskSlice.actions;

export default taskSlice.reducer;

export const getGoals = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(requestGetGoals);
      const {
        input: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/goals/mygoals`, config);
      dispatch(getGoalsSuccess(data));
    } catch (error) {
      dispatch(
        getGoalsFailed(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

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
      const { data } = await axios.get(`/api/quests/myquests`, config);
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

export const deleteTask = (id) => {
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

       dispatch(getTasks());
      // dispatch(deleteTaskSuccess());
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

export const deleteGoals = (id) => {
  return async (dispatch, getState) => {
    console.log('delete goal')
    try {
      console.log('delete goal224')
      dispatch(requestDeleteGoals());
      const {
        input: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      console.log('delete goal22')
      const { data } = await axios.delete(`/api/goals/${id}`, config);

       dispatch(getGoals());
       console.log('delete goal2')
      // dispatch(deleteTaskSuccess());
    } catch (error) {
      console.log(error)
      dispatch(
        deleteGoalsFailed(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export const updateTaskDetails = (task) => {
  return async (dispatch, getState) => {
    console.log(task)
    try {
      dispatch(requestTaskStatus());
     
      const {
        input: { userInfo },
      } = getState();
     
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/quests//updateQuest/${task._id}`,
        {...task},
        config
      );

      dispatch(taskStatusSuccess(data));
      dispatch(getTasks());
    } catch (error) {
      console.log(error)
      dispatch(
        taskStatusFailed(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export const updateGoalsDetails = (goals) => {
  return async (dispatch, getState) => {
    console.log(goals)
    try {
      dispatch(requestGoalsStatus());
     
      const {
        input: { userInfo },
      } = getState();
     
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/goals/updateGoals/${goals._id}`,
        {...goals},
        config
      );
    
      dispatch(goalsStatusSuccess(data));
      dispatch(getGoals());
    } catch (error) {
      console.log(error)
      dispatch(
        goalsStatusFailed(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};
export const updateQuestStatus = ({ id }) => {
  return async (dispatch, getState) => {
    try {
      dispatch(requestTaskStatus());
      console.log("adsg324");
      const {
        input: { userInfo },
      } = getState();
      console.log(userInfo, "adsg32");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/quests/${id}`,
        {},
        config
      );

      dispatch(taskStatusSuccess(data));
    } catch (error) {
      dispatch(
        taskStatusFailed(
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
export const addGoals = (goals) => {
  return async (dispatch, getState) => {
    try {
      dispatch(requestAddGoals());
      const {
        input: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/goals`, goals, config);

      dispatch(addGoalsSuccess(data));
    } catch (error) {
      dispatch(
        addGoalsFailed(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};
