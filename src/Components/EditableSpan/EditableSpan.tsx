import React, {ChangeEvent, useState} from 'react';

export type EditableSpanPropsType = {
    oldTitle: string
    callback: (updateTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = ({
                                                                  oldTitle,
                                                                  callback
                                                              }) => {

    const [edit, setEdit] = useState(false)
    const [updateTitle, setUpdateTitle] = useState(oldTitle)

    const editHandler = () => {
        setEdit(!edit)
        if (edit) addTask()
    }

    const addTask = () => {
        callback(updateTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)
    }


    return (
        edit
            ? <input
                onChange={onChangeHandler}
                value={updateTitle}
                onBlur={editHandler}
                autoFocus
            />
            : <span onDoubleClick={editHandler}>{oldTitle}</span>
    );
};

