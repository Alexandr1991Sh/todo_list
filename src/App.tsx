import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Components/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistsType = {
    id: string
    title: string
    filter: BtnNameType
}

export type BtnNameType = 'All' | 'Active' | 'Completed'

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
    }
    const changeFilter = (todolistId: string, btnName: BtnNameType) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: btnName} : tl))
    }
    const addTask = (todolistId: string, task: string) => {
        const newTask = {id: v1(), title: task, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(tl => tl.id === taskId ? {...tl, isDone} : tl)})
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
    }

    const addTodolist = (newTitle:string) => {
        let newTodolistId = v1()
        const newTodolist: TodolistsType ={id: newTodolistId, title: newTitle, filter: 'All'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }


    return (
        <div className="App">
            <AddItemForm callback={addTodolist}/>
            {
                todolists.map(todolist => {
                    let tasksForTodolist = tasks[todolist.id]
                    if (todolist.filter === 'Active') {
                        tasksForTodolist = tasks[todolist.id].filter(task => !task.isDone)
                    }

                    if (todolist.filter === 'Completed') {
                        tasksForTodolist = tasks[todolist.id].filter(task => task.isDone)
                    }
                    return <Todolist
                        key={todolist.id}
                        todolistId={todolist.id}
                        title={todolist.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={todolist.filter}
                        removeTodolist={removeTodolist}
                    />

                })
            }

        </div>
    );
}

export default App;
