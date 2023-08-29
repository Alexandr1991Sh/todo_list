import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: TodolistType[], action: TodolistReducerType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            let newTodolist: TodolistType = {
                id: action.payload.newTodolistId,
                title: action.payload.title,
                filter: 'all'
            };
            return [...state, newTodolist]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        }
        default:
            return state
    }
}

type TodolistReducerType = RemoveTodolistAc | AddTodolistAcType | ChangeTodolistTitleAcType | ChangeTodolistFilterAcType

type RemoveTodolistAc = ReturnType<typeof removeTodolistAc>
export const removeTodolistAc = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {id}
    } as const
}

type AddTodolistAcType = ReturnType<typeof addTodolistAc>
export const addTodolistAc = (title: string, newTodolistId: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {title, newTodolistId}
    } as const
}

type ChangeTodolistTitleAcType = ReturnType<typeof changeTodolistTitleAc>
export const changeTodolistTitleAc = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {id, title}
    } as const
}

type ChangeTodolistFilterAcType = ReturnType<typeof changeTodolistFilterAc>
export const changeTodolistFilterAc = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter
        }
    } as const
}
