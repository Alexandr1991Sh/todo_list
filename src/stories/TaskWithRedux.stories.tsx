import type {Meta, StoryObj} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {TaskWithRedux} from "../Components/TaskWithRedux";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TaskType} from "../Components/Todolist";


const meta: Meta<typeof TaskWithRedux> = {
    title: 'TODOLISTS/TaskWithRedux',
    component: TaskWithRedux,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],
    args: {
        task: {id: '111', title: 'js', isDone: false},
        todolistId: 'todo1'
    }
};

export default meta;
type Story = StoryObj<typeof TaskWithRedux>;

const TaskComponent = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    return <TaskWithRedux task={task} todolistId={'todolistId1'}/>
}

export const TaskWithReduxStory: Story = {
    render: args => <TaskComponent/>
}
