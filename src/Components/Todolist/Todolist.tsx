import React, {ChangeEvent, useState} from 'react';
import {BtnNameType, TaskType} from "../../App";
import {Button} from "../Button";
import s from './Todulist.module.css'


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
}

export const Todolist: React.FC<TodolistPropsType> = (
    {
        title,
        tasks,
        changeFilter,
        removeTask,
        addTask,
        changeTaskStatus,
        filter,
        todolistId,
        removeTodolist
    }
) => {

    const [value, setValue] = useState('')
    const [error, setError] = useState<string | null>(null)


    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onclickAddTask = () => {
        if (value.trim() !== '') {
            addTask(todolistId, value)
            setValue('')
        } else {
            setError('Title is required')
        }
    }

    const onKeyPressHandler = (e: any) => {
        setError(null)
        if (e.key === 'Enter') {
            if (value.trim() !== '') {
                addTask(todolistId, value)
                setValue('')
            } else {
                setError('Title is required')
            }
        }
    }

    const onClickRemoveTodolistHandler = () => removeTodolist(todolistId)


    const [btnName, setBtnName] = useState<BtnNameType>('All')
    const onClickChangeBtnName = (todolistId: string, btnName: BtnNameType) => {
        changeFilter(todolistId, btnName)
        setBtnName(btnName)
    }

    const mappedTasks = tasks.length === 0 ? 'Your task list is empty'
        : tasks.map(tasks => {

            const onClickRemoveTaskHandler = () => removeTask(todolistId, tasks.id)

            const onChangeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                changeTaskStatus(todolistId, tasks.id, e.currentTarget.checked)
            }

            return (
                <li key={tasks.id} className={tasks.isDone ? s.isDone : ''}>
                    <input
                        type="checkbox"
                        checked={tasks.isDone}
                        onChange={onChangeIsDoneHandler}
                    />

                    <span>{tasks.title}</span>
                    <Button name={'x'} callBack={onClickRemoveTaskHandler}/>
                </li>
            )
        })


    return (
        <div>
            <Button name={'x'} callBack={onClickRemoveTodolistHandler}/>
            <h3>{title}</h3>

            <div>
                <input
                    value={value}
                    onChange={onChangeInputHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? s.error : ''}
                />
                <Button name={'+'} callBack={onclickAddTask}/>
                {error && <div className={s.errorMessage}>{error}</div>}
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



