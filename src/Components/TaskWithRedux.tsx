import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {AppRootStateType} from "../state/store";

export type TaskWithReduxPropsType = {
    task: TaskType
    todolistId: string
}
export const TaskWithRedux = memo((
    {task, todolistId}: TaskWithReduxPropsType) => {

    const t = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistId]
        .find(t => t.id === task.id) as  TaskType)

    const dispatch = useDispatch()

    const removeTsk = () => {
        // dispatch(removeTaskAC(task.id, todolistId))
        dispatch(removeTaskAC(t.id, todolistId))
    }
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        // dispatch(changeTaskStatusAC(task.id, newIsDoneValue, todolistId))
        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, todolistId))
    }

    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC(task.id, title, todolistId))
    }

    return <div className={task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={task.isDone}
            color="primary"
            onChange={changeTaskStatus}
        />

        <EditableSpan value={task.title} onChange={changeTaskTitle}/>
        <IconButton onClick={removeTsk}>
            <Delete/>
        </IconButton>
    </div>
});

