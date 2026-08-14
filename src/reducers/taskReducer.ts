import type { Task } from "../types";

interface State {
    tasks: Task[];
}

type Action =
    | { type: 'ADD_TASK'; payload: Task }
    | { type: 'REMOVE_TASK'; payload: number }
    | { type: 'TOGGLE_TASK'; payload: Task }
    | { type: 'SET_TASKS'; payload: Task[] };

function taskReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_TASKS':
            return {
                ...state,
                tasks: action.payload
            }
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    action.payload
                ]
            };
        case 'REMOVE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload)
            };
        case 'TOGGLE_TASK':
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                        task.id === action.payload.id ? action.payload : task
                )
            };
        default:
            throw new Error('Ação desconhecida');
    }
}

export default taskReducer;