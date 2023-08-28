import React, {ChangeEvent, useState} from 'react';
import {BtnNameType, TaskType} from "../../App";
import {Button} from "../Button";
import s from './Todulist.module.css'
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";


type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, btnName: BtnNameType) => void
    addTask: (todolistId: string, task: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: BtnNameType
    todolistId: string
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, updateTitle: string) => void
    updateTitleTodolist: (todolistId: string, updateTitle: string)=>void
}

export const Todolist: React.FC<TodolistPropsType> = (
    {
        title,
        tasks,
        changeFilter,
        removeTask,
        addTask,
        changeTaskStatus,
        todolistId,
        removeTodolist,
        updateTask,
        updateTitleTodolist
    }
) => {

    const onClickRemoveTodolistHandler = () => removeTodolist(todolistId)

    const [btnName, setBtnName] = useState<BtnNameType>('All')
    const onClickChangeBtnName = (todolistId: string, btnName: BtnNameType) => {
        changeFilter(todolistId, btnName)
        setBtnName(btnName)
    }

    const callBackUpdateTitleTodolist = (updateTitle:string) => {
        updateTitleTodolist(todolistId,updateTitle)
    }

    const mappedTasks = tasks.length === 0 ? 'Your task list is empty'

        : tasks.map(tasks => {

            const onClickRemoveTaskHandler = () => removeTask(todolistId, tasks.id)

            const onChangeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                changeTaskStatus(todolistId, tasks.id, e.currentTarget.checked)
            }

            const callBackUpdateTask = (updateTitle:string) => {
                updateTask(todolistId,tasks.id,updateTitle)
            }


            return (
                <div className={s.titleAndBtn}>
                    <li key={tasks.id} className={tasks.isDone ? s.isDone : ''}
                        style={{display: "flex", alignItems: "center"}}>
                        <input
                            type="checkbox"
                            checked={tasks.isDone}
                            onChange={onChangeIsDoneHandler}
                        />
                        <div className={s.title}>
                            <EditableSpan callback={callBackUpdateTask} oldTitle={tasks.title}/>
                        </div>
                        <div className={s.btn}>
                            <Button name={'x'} callBack={onClickRemoveTaskHandler}/>
                        </div>
                    </li>
                </div>
            )
        })

    const addTaskHandler = (title: string) => {
        addTask(todolistId, title)
    }


    return (
        <div>
            <div className={s.titleAndBtn}>
                {/*<h3>{title}</h3>*/}
                <EditableSpan oldTitle={title} callback={callBackUpdateTitleTodolist}/>
                <Button name={'x'} callBack={onClickRemoveTodolistHandler}/>
            </div>

            <div>
                <AddItemForm callback={addTaskHandler}/>
            </div>

            <ul>
                {mappedTasks}
            </ul>

            <div>
                <Button myClass={btnName === 'All' ? s.activeFilter : ''} name={'All'}
                        callBack={() => onClickChangeBtnName(todolistId, 'All')}/>
                <Button myClass={btnName === 'Active' ? s.activeFilter : ''} name={'Active'}
                        callBack={() => onClickChangeBtnName(todolistId, 'Active')}/>
                <Button myClass={btnName === 'Completed' ? s.activeFilter : ''} name={'Completed'}
                        callBack={() => onClickChangeBtnName(todolistId, 'Completed')}/>
            </div>

        </div>
    );
};



