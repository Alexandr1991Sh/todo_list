import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "../Todolist";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, removeTaskAC} from "../state/tasks-reducer";

export type TaskWithReduxPropsType = {
    task: TaskType
   todolistId: string
}
export const TaskWithRedux = memo(({
                         task,
                        todolistId
                     }: TaskWithReduxPropsType) => {

    const dispatch = useDispatch()

    const removeTsk = () =>{
        dispatch(removeTaskAC(task.id, todolistId))
    }
    const changeTaskStatus =(e: ChangeEvent<HTMLInputElement>)=>{
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(task.id, newIsDoneValue, todolistId))
    }

    return <div className={task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={task.isDone}
            color="primary"
            onChange={changeTaskStatus}
        />

        <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={removeTsk}>
            <Delete/>
        </IconButton>
    </div>
});

