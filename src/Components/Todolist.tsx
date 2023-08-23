import React, {ChangeEvent, useState} from 'react';
import {BtnNameType, TaskType} from "../App";
import {Button} from "./Button";


type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (btnName: BtnNameType) => void
    addTask: (task: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (
    {title, tasks, changeFilter, removeTask, addTask}
) => {

    const [value, setValue] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onclickAddTask = () => {
        addTask(value)
        setValue('')
    }

    const onKeyPressHandler = (e: any) => {
        if (e.key === 'Enter') {
            addTask(value)
            setValue('')
        }
    }

    const onAllClickHandler = () => changeFilter('All')
    const onActiveClickHandler = () => changeFilter('Active')
    const onCompletedClickHandler = () => changeFilter('Completed')

    const mappedTasks = tasks.length === 0 ? 'Your task list is empty'
            : tasks.map(tasks => {

                const onClickRemoveTaskHandler = () => removeTask(tasks.id)

                return (
                    <li key={tasks.id}>
                        <input type="checkbox" checked={tasks.isDone}/>
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
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <Button name={'+'} callBack={onclickAddTask}/>
            </div>

            <ul>
                {mappedTasks}
            </ul>

            <div>
                <Button name={'All'} callBack={onAllClickHandler}/>
                <Button name={'Active'} callBack={onActiveClickHandler}/>
                <Button name={'Completed'} callBack={onCompletedClickHandler}/>
            </div>

        </div>
    );
};

