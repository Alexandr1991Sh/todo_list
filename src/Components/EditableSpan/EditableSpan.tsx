import React, {ChangeEvent, useState} from 'react';

export type EditableSpanPropsType = {
    oldTitle: string
}

export const EditableSpan: React.FC<EditableSpanPropsType> = ({
                                                                  oldTitle
                                                              }) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(oldTitle)

    const activateEditMode = () => {
        setEditMode(!editMode)
        setTitle(oldTitle)
    }

    const activateViуцMode = () => {
        setEditMode(!editMode)
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
      // setTitle()
        console.log(e.currentTarget.value)
    }

    return (
        editMode
            ? <input onChange={onChangeTitle} value={title} onBlur={activateViуцMode} autoFocus/>
            : <span onDoubleClick={activateEditMode}>{title}</span>
    );
};

