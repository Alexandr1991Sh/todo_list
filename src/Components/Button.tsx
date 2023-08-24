import React from 'react';

type ButtonPropsType = {
    name: string
    callBack: () => void
    myClass ?: string
}

export const Button: React.FC<ButtonPropsType> = ({name, callBack,myClass}) => {

    const onClickHandler = () => {
        callBack()
    }

    return (
        <button className={myClass} onClick={onClickHandler}>{name}</button>
    );
};

