import { v4 as uuidv4 } from 'uuid';

export type Todo = {
    id: string
    text: string
    isCompleted: boolean
}

export type Filter = "all" | "active" | "completed"

const ADD_TASK = 'ADD_TASK'
const CLEAR_COMPLETED_TASKS = 'CLEAR_COMPLETED_TASKS'
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'

export const initState: Todo[] = [
    {id: "1", text: 'Тестовое задание', isCompleted: true},
    {id:" 2", text: 'Прекрасный код', isCompleted: false},
    {id: "3", text: 'Покрытие тестами', isCompleted: false},
]

export function todolistReducer(state: Todo[] = initState, action: TodolustReducerType) {
    switch (action.type) {
        case ADD_TASK:
            const id = uuidv4();
            return [...state, {id:id, text:action.payload.titleTask, isCompleted: false}];

        case CHANGE_TASK_STATUS:
            return [...state.map(task=> task.id === action.payload.id?{...task, isCompleted:action.payload.isCompleted} : task)];

        case CLEAR_COMPLETED_TASKS:
            return [...state.filter(task =>task.isCompleted ===false)];

        default:
            return state;
    }
}


export const addTaskAC = (titleTask: string) => {
    return {
        type: ADD_TASK,
        payload: { titleTask }
    } as const;
}

export const changeTaksStatusAC = (id:string, isCompleted:boolean) => {
    return {
        type: CHANGE_TASK_STATUS,
        payload: { id,isCompleted  }
    } as const;
}

export const clearCompletedTasksAC = () => {
    return {
        type: CLEAR_COMPLETED_TASKS,
    } as const;
}

type AddTaskType=ReturnType<typeof addTaskAC>
type ChangeTaksStatusType=ReturnType<typeof changeTaksStatusAC>
type ClearCompletedTasksTYpe=ReturnType<typeof clearCompletedTasksAC>

type TodolustReducerType=AddTaskType | ChangeTaksStatusType | ClearCompletedTasksTYpe
