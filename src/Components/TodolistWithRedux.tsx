import React, {ChangeEvent} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";
import {SuperCheckBox} from "./SuperCheckBox";
import {TodolistType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {
    addTaskAC,
    changeTaskStatusAC, changeTaskTitleAC,
    removeTaskAC,
    removeTodolistAC
} from "../state/Reducer/tasksReducer/tasks-reducer";
import {changeTodolistFilterAc, changeTodolistTitleAc} from "../state/Reducer/todolistsReducer/todolist-reducer";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
}

export function TodolistWithRedux({todolist}: PropsType) {
    const {id, title, filter} = todolist
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])

    const dispatch = useDispatch()

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, id))
    }

    const removeTodolist = () => {
        dispatch(removeTodolistAC(id))
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAc(id, id))
    }

    const onAllClickHandler = () => dispatch(changeTodolistFilterAc(id, "all",))
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAc(id, 'active'))
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAc(id, 'completed'))


    const changeStatusHandler = (taskId: string, changeEvent: boolean) => {
        dispatch(changeTaskStatusAC(taskId, changeEvent,id))
    }

    if (filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }

    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id,newIsDoneValue,id))
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id,newValue,id))
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>

                        <SuperCheckBox isDone={t.isDone}
                                       callBack={(changeEvent) => changeStatusHandler(t.id, changeEvent)}/>

                        <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
}


