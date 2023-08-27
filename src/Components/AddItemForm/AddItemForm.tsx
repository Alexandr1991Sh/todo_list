import React, {ChangeEvent, useState} from 'react';
import s from "../Todolist/Todulist.module.css";
import {Button} from "../Button";

export type AddItemFormPropsType = {
    callback: (newTitle: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = ({callback}) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onclickAddTask = () => {
        if (value.trim() !== '') {
            callback(value)
            setValue('')
        } else {
            setError('Title is required')
        }
    }

    const onKeyPressHandler = (e: any) => {
        setError(null)
        if (e.key === 'Enter') {
            if (value.trim() !== '') {
                callback(value)
                setValue('')
            } else {
                setError('Title is required')
            }
        }
    }

    return (
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
    );
};

