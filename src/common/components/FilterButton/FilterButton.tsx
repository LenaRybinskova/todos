
import styles from './FilterButton.module.scss'
import {Filter} from '../../../features/Todolist/todolistReducer';


type Props = {
    label: Filter
    callBack: (label: Filter) => void
    currentFilter:Filter
}

export const FilterButton = ({label, callBack,currentFilter}: Props) => {

    const onClickHandler = () => {
        console.log("label", label)
        callBack(label)
    }
    return (
        <button onClick={onClickHandler} className={`${styles.filterButton} ${currentFilter=== label? styles.active : ""}`}>{label}</button>
    )
}