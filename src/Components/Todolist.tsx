import React, {useState} from 'react';
import {BtnNameType, TaskType} from "../App";


type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
    // filterTasks: (btnName: BtnNameType)=>void
}

export const Todolist: React.FC<TodolistPropsType> = ({title, tasks, removeTask}) => {

    const [filteredTask, setFilteredTask] = useState<BtnNameType>('All')

    const filterTasks = (btnName: BtnNameType) => {
        setFilteredTask(btnName)
    }
    const boxForFilters=()=>{
        let tasksForTodolist = tasks
        if (filteredTask === 'Active') {
            tasksForTodolist = tasks.filter(task => !task.isDone)
        }

        if (filteredTask === 'Completed') {
            tasksForTodolist = tasks.filter(task => task.isDone)
        }
        return tasksForTodolist
    }


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>

            <ul>
                {tasks.length === 0 ? 'Your task list is empty'
                    : boxForFilters().map(tasks => {
                        return (
                            <li key={tasks.id}>
                                <input type="checkbox" checked={tasks.isDone}/>
                                <span>{tasks.title}</span>
                                <button onClick={() => {
                                    removeTask(tasks.id)
                                }}>x
                                </button>
                            </li>
                        )
                    })}
            </ul>

            <div>
                <button onClick={()=>filterTasks('All')}>All</button>
                <button onClick={()=>filterTasks('Active')}>Active</button>
                <button onClick={()=>filterTasks('Completed')}>Completed</button>
            </div>

        </div>
    );
};

