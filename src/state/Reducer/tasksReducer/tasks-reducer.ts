import {TasksStateType} from "../../../App";
import {v1} from "uuid";

export const tasksReducer = (state: TasksStateType, action: TasksReducerType): TasksStateType => {
    switch (action.type) {
        case 'CHANGE-TASKS-STATUS': {
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].map(el => el.id === action.payload.id ? {
                        ...el, isDone: action.payload.isDone
                    } : el)
            }
        }
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.id)
            }
        }
        case "ADD-TASK": {
            let task = {id: v1(), title: action.payload.title, isDone: false};
            return {
                ...state,
                [action.payload.todolistId]: [task, ...state[action.payload.todolistId]]
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id ? {
                    ...el,
                    title: action.payload.newTitle
                } : el)
            }
        }
        case "ADD-TODOLIST": {
            // let newTodolistId = v1();
            return {
                ...state,
                [action.payload.newTodolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
                delete stateCopy[action.payload.id]
            return stateCopy
        }
        default:
            return state
    }
}

type TasksReducerType =
    ChangeTaskStatusAC
    | RemoveTaskAC
    | AddTaskAC
    | ChangeTaskTitleAC
    | AddTodolistAC
    | RemoveTodolistAC

type ChangeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: "CHANGE-TASKS-STATUS",
        payload: {id, isDone, todolistId}
    } as const
}

type RemoveTaskAC = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {id, todolistId}
    } as const
}

type AddTaskAC = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {title, todolistId}
    } as const
}

type ChangeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {id, newTitle, todolistId}
    } as const
}

type AddTodolistAC = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string, newTodolistId: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {title, newTodolistId}
    } as const
}

type RemoveTodolistAC = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id}
    } as const
}

