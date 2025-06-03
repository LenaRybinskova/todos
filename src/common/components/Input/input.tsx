import {ChangeEvent, useState} from 'react';
import  { KeyboardEvent,  FocusEvent  } from 'react';
import styles from "./input.module.scss"

type Props = {
    callback: (newValue: string) => void;
}

export const Input = ({callback}: Props) => {

    const [value, setValue] = useState<string>("")

    const onChangeHandler =(e:ChangeEvent<HTMLInputElement>)=>{
        setValue(e.target.value)
    }

    const onBlurHandler= (e:FocusEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        setValue("")
    };

    const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            callback(value);
            setValue("")
        }
    };

    return (
        <div className={styles.inputWrapper}>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={value}
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                    onKeyDown={onKeyDownHandler}
                    className={styles.input}
                />
            </div>
        </div>
    )
}