import { combineReducers } from "redux";
import taskSlice from "../Pages/MainPage/MainPage.slice";
import inputSlice from "../Pages/Input/input.slice";

export const reducer = combineReducers({
  tasks: taskSlice,
  input: inputSlice,
});
