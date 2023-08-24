import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Components/Todolist/Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type BtnNameType = 'All' | 'Active' | 'Completed'

function App() {
    const [filteredTask, setFilteredTask] = useState<BtnNameType>('All')

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const changeFilter = (btnName: BtnNameType) => {
        setFilteredTask(btnName)
    }

    let tasksForTodolist = tasks
    if (filteredTask === 'Active') {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }

    if (filteredTask === 'Completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }

    const addTask = (task: string) => {
        const newTask = {id: v1(), title: task, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {
        setTasks(tasks.map(task => task.id === id ? {...task, isDone} : task))
    }


    return (
        <div className="App">

            <Todolist
                title={"What to learn one"}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />

        </div>
    );
}

export default App;
