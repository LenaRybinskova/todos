import * as React from 'react';
import styles from "./task.module.scss"

type Props = {
    id:string
    checked: boolean;
    callback: (id:string, checked: boolean) => void;
    text:string
};

export const Task = ({ id, checked, callback,text }: Props) => {
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        callback(id, !checked);
        console.log("e.currentTarget.checked", e.currentTarget.checked);
    };

    return (
        <div>
            <input type="checkbox" checked={checked} onChange={onChangeHandler} className={`${styles.checkbox} ${checked ? styles.completed : ''}`}/>
            <span className={`${styles.todoText} ${checked ? styles.completedText : ''}`}>{text}</span>
        </div>
    );
};