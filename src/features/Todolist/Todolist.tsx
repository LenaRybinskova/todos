import {useEffect, useReducer, useState} from 'react';
import styles from './todolist.module.scss'
import {addTaskAC, clearCompletedTasksAC, Filter, initState, todolistReducer} from '../Todolist/todolistReducer';
import {Input} from '../../common/components/Input/input';
import {FilterButton} from '../../common/components/FilterButton/FilterButton';
import {Task} from '../Task/Task';


export const Todolist = () => {
    const [filter, setFilter] = useState<Filter>('all')

    const [state, dispatch] = useReducer(todolistReducer, initState);
    //console.log("state", state)

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

    const changeTaskStatusHandler=()=>{

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
                            <Task key={todo.id} text={todo.text} checked={todo.isCompleted} callback={changeTaskStatusHandler}/>

                            <button
                                onClick={() => toggleTodo(todo.id)}
                                className={`${styles.checkbox} ${todo.isCompleted ? styles.completed : ''}`}
                            >
                                {/*  {todo.completed } />}*/}
                            </button>
                            <span
                                className={`${styles.todoText} ${todo.isCompleted ? styles.completedText : ''}`}>{todo.text}</span>
                        </div>
                    ))}
                </div>

                <div className={styles.footer}>
                    <span className={styles.itemCount}>{activeCount} items left</span>

                    <div className={styles.filters}>
                        <FilterButton label={'all'} callBack={filteredHandler}/>
                        <FilterButton label={'active'} callBack={filteredHandler}/>
                        <FilterButton label={'completed'} callBack={filteredHandler}/>
                        {/* <button
                            onClick={() => setFilter('all')}
                            className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('active')}
                            className={`${styles.filterBtn} ${filter === 'active' ? styles.active : ''}`}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => setFilter('completed')}
                            className={`${styles.filterBtn} ${filter === 'completed' ? styles.active : ''}`}
                        >
                            Completed
                        </button>*/}
                    </div>

                    <button onClick={clearCompletedHandler} className={styles.clearBtn}>
                        Clear completed
                    </button>
                </div>
            </div>
        </div>
    )
}
