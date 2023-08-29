import React, {ChangeEvent} from 'react';
import {Checkbox} from "@mui/material";

type TypeProps={
    isDone:boolean
    callBack: (changeEvent: boolean)=>void
}

export const SuperCheckBox = (props: TypeProps) => {
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
      props.callBack(e.currentTarget.checked)
    }
    return (
        <Checkbox
            checked={props.isDone}
            color="primary"
            onChange={onChangeHandler}
        />
    );
};
