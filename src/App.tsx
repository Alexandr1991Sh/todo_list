import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Components/Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type BtnNameType = 'All' | 'Active' | 'Completed'

function App() {
    // const [filteredTask, setFilteredTask] = useState<BtnNameType>('All')

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    // const filterTasks = (btnName: BtnNameType) => {
    //     setFilteredTask(btnName)
    // }
    //
    // let tasksForTodolist = tasks
    // if (filteredTask === 'Active') {
    //     tasksForTodolist = tasks.filter(task => !task.isDone)
    // }
    //
    // if (filteredTask === 'Completed') {
    //     tasksForTodolist = tasks.filter(task => task.isDone)
    // }


    return (
        <div className="App">

            <Todolist
                title={"What to learn one"}
                tasks={tasks}
                removeTask={removeTask}
                // filterTasks={filterTasks}
            />

        </div>
    );
}

export default App;
