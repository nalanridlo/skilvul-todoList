import { createSlice } from '@reduxjs/toolkit'
import {TODO_KEY, storageExist} from "../../storage/localStorage";

//If localStorage doesn't exist,
if(!localStorage.getItem(TODO_KEY)){
    storageExist([]);
}

//Set storage and assign value from LocalStorage
const storage = localStorage.getItem(TODO_KEY);
//Set initial state variabel and assign storage with json parsing
const initialState = JSON.parse(storage);

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            storageExist([...state, action.payload]);
            return [...state, action.payload];
        },
        deleteTodo: (state, action) => {
            const filteredTodo = state.filter((todo) => todo.id !== action.payload);
            storageExist(filteredTodo);
            return filteredTodo;
        },
        handleCompletedTodo: (state, action) => {
            let id = action.payload;
            const updateCompletedTodo = [];
            state.map( item => {
                if( item.id === id ) {
                    item.isCompleted = !item.isCompleted;
                }
                updateCompletedTodo.push(item);
            } );
            storageExist(updateCompletedTodo);
        },
        updateTodo: (state, action) => {
            let data = action.payload;
            const updateArrayTodo = [];
            state.map( item => {
                if( item.id === data.id ) {
                    item.id = data.id;
                    item.todo = data.todo;
                    item.isCompleted = data.isCompleted;
                }
                updateArrayTodo.push(item);
            } );
            storageExist(updateArrayTodo);

        },
         
        deleteAllTodo: (state, action) => {
            storageExist([]);
            return [];
        },
    }
})


export const { addTodo,deleteTodo,updateTodo,handleCompletedTodo, deleteAllTodo } = todoSlice.actions

export default todoSlice.reducer