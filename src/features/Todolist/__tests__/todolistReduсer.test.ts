import {addTaskAC, changeTaksStatusAC, clearCompletedTasksAC, Todo, todolistReducer} from '../todolistReducer';
import {useReducer} from 'react';

let startState: Todo[];

beforeEach(() => {
    startState = [
        {id: "1", text: 'Тестовое задание', isCompleted: true},
        {id: "2", text: 'Прекрасный код', isCompleted: false},
        {id: "3", text: 'Покрытие тестами', isCompleted: false},
    ];
});

test('A new task should be added', () => {
    const action = addTaskAC("Новое задание");

    const endState = todolistReducer(startState, action);

    expect(endState.length).toBe(4);
    expect(endState[3].text).toBe("Новое задание");
    expect(endState[3].isCompleted).toBe(false);
});


test('Task completion status should be changed', () => {
    const action = changeTaksStatusAC("2", true);

    const endState = todolistReducer(startState, action);

    expect(endState[1].isCompleted).toBe(true);
    expect(endState[0].isCompleted).toBe(true);
    expect(endState[2].isCompleted).toBe(false);
});

test('All completed tasks should be cleared', () => {
    const action = clearCompletedTasksAC();

    const endState = todolistReducer(startState, action);

    expect(endState.length).toBe(2);
    expect(endState.find(task => task.id === "1")).toBeUndefined();
    expect(endState.find(task => task.id === "2")).toBeDefined();
    expect(endState.find(task => task.id === "3")).toBeDefined();
});