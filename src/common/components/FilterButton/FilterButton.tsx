
import styles from './FilterButton.module.scss'
import {Filter} from '../../../features/Todolist/todolistReducer';


type Props = {
    label: Filter
    callBack: (label: Filter) => void
}

export const FilterButton = ({label, callBack}: Props) => {

    const onClickHandler = () => {
        console.log("label", label)
        callBack(label)
    }
    return (
        <button onClick={onClickHandler}>{label}</button>
    )
}