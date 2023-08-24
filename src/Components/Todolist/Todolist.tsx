import React, {ChangeEvent, useState} from 'react';
import {BtnNameType, TaskType} from "../../App";
import {Button} from "../Button";
import s from './Todulist.module.css'


type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (btnName: BtnNameType) => void
    addTask: (task: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
}

export const Todolist: React.FC<TodolistPropsType> = (
    {
        title,
        tasks,
        changeFilter,
        removeTask,
        addTask,
        changeTaskStatus
    }
) => {

    const [value, setValue] = useState('')
    const [error, setError] = useState<string | null>(null)


    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onclickAddTask = () => {
        if (value.trim() !== '') {
            addTask(value)
            setValue('')
        } else {
            setError('Title is required')
        }
    }

    const onKeyPressHandler = (e: any) => {
        setError(null)
        if (e.key === 'Enter') {
            if (value.trim() !== '') {
                addTask(value)
                setValue('')
            } else {
                setError('Title is required')
            }
        }
    }

    const [btnName, setBtnName] = useState<BtnNameType>('All')
    const onClickChangeBtnName = (value: BtnNameType) => {
        changeFilter(value)
        setBtnName(value)
    }

    const mappedTasks = tasks.length === 0 ? 'Your task list is empty'
        : tasks.map(tasks => {

            const onClickRemoveTaskHandler = () => removeTask(tasks.id)

            const onChangeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                changeTaskStatus(tasks.id, e.currentTarget.checked)
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
                        callBack={() => onClickChangeBtnName('All')}/>
                <Button myClass={btnName === 'Active' ? s.activeFilter : ''} name={'Active'}
                        callBack={() => onClickChangeBtnName('Active')}/>
                <Button myClass={btnName === 'Completed' ? s.activeFilter : ''} name={'Completed'}
                        callBack={() => onClickChangeBtnName('Completed')}/>
            </div>

        </div>
    );
};



