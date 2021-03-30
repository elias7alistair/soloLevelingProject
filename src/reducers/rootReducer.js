import { combineReducers } from "redux";
import taskSlice from "../Pages/MainPage/MainPage.slice";

export const reducer = combineReducers({
  tasks: taskSlice,
});
