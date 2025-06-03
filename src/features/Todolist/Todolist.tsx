import {useEffect, useReducer, useState} from 'react';
import styles from './todolist.module.scss'
import {
    addTaskAC,
    changeTaksStatusAC,
    clearCompletedTasksAC,
    Filter,
    initState,
    todolistReducer
} from '../Todolist/todolistReducer';
import {Input} from '../../common/components/Input/input';
import {FilterButton} from '../../common/components/FilterButton/FilterButton';
import {Task} from '../Task/Task';


export const Todolist = () => {
    const [filter, setFilter] = useState<Filter>('all')
    const [state, dispatch] = useReducer(todolistReducer, initState);

    const addTaskHandler = (taskTitle: string) => {
        dispatch(addTaskAC(taskTitle));
    };

    const clearCompletedHandler = () => {
        dispatch(clearCompletedTasksAC())
    }

    const filteredTodos = state.filter((todo) => {
        if (filter === 'active') return !todo.isCompleted
        if (filter === 'completed') return todo.isCompleted
        return true
    })

    const filteredHandler = (filterValue: Filter) => {
        console.log('filter', filterValue)
        setFilter(filterValue)
    }

    const changeTaskStatusHandler = (id: string, checked: boolean) => {
        dispatch(changeTaksStatusAC(id, checked))
    }

    const activeCount = state.filter((todo) => !todo.isCompleted).length

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>todos</h1>

                <Input callback={addTaskHandler}/>
                <div className={styles.todoCard}>
                    <div className={styles.todoList}>

                        {filteredTodos.map((todo) => (
                            <div key={todo.id} className={styles.todoItem}>
                                <Task id={todo.id} key={todo.id} text={todo.text} checked={todo.isCompleted}
                                      callback={changeTaskStatusHandler}/>
                            </div>
                        ))}
                    </div>

                    <div className={styles.footer}>
                        <span className={styles.itemCount}>{activeCount} items left</span>

                        <div className={styles.filterGroup}>
                            <FilterButton label={'all'} callBack={filteredHandler} currentFilter={filter}/>
                            <FilterButton label={'active'} callBack={filteredHandler} currentFilter={filter}/>
                            <FilterButton label={'completed'} callBack={filteredHandler} currentFilter={filter}/>
                        </div>

                        <button onClick={clearCompletedHandler} className={styles.clearBtn}>
                            Clear completed
                        </button>
                    </div>
                </div>
        </div>
    )
}
