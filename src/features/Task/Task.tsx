import * as React from 'react';

type Props = {
    checked: boolean;
    callback: (checked: boolean) => void;
    text:string
};

export const Task = ({ checked, callback,text }: Props) => {
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        callback(e.currentTarget.checked);
    };

    return (
        <div>
            <input type="checkbox" checked={checked} onChange={onChangeHandler}/>
            <span>{text}</span>
        </div>
    );
};