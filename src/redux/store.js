import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./reducer/todoReducer";

export default configureStore({
  reducer: {
    todos: todoReducer,
  },
});