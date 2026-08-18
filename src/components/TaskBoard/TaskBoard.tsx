'use client'

import { useReducer } from "react";
import api from "../../services/api";
import taskReducer from "../../reducers/taskReducer";
import AddTask from "../../Pages/AddTask/AddTask";
import TaskList from "../../Pages/TaskList/TaskList";
import type { Task } from "../../types";
import { useTrash } from "../../contexts/TrashContext";

interface TaskBoardProps {
    initialTasks: Task[];
}

const TaskBoard: React.FC<TaskBoardProps> = ({ initialTasks }) => {
    const { hiddenIds, moveToTrash } = useTrash();
    const [state, dispatch] = useReducer(taskReducer, { tasks: initialTasks });
    const visibleTasks = state.tasks.filter((task) => !hiddenIds.has(task.id));

    const addTask = (taskName: string) => {
        api.post('/tasks', { name: taskName, completed: false })
            .then(response => {
                dispatch({ type: 'ADD_TASK', payload: response.data })
            })
            .catch(error => {
                console.error('Error adding task:', error)
            })
    };

    const removeTask = (taskId: number) => {
        const task = state.tasks.find(task => task.id === taskId)
        if (task) {
            moveToTrash(task);
        }
    };

    const toggleTask = (taskId: number) => {
        const task = state.tasks.find(task => task.id === taskId)
        if (task) {
            const completed = !task.completed;
            api.put(`/tasks/${taskId}`, { ...task, completed, completedAt: completed ? new Date().toISOString() : null })
                .then(response => {
                    dispatch({ type: 'TOGGLE_TASK', payload: response.data });
                })
                .catch(error => {
                    console.error('Error toggling task:', error)
                })
        }
    };

    return (
        <>
            <h1>Pendências</h1>
            <AddTask onAddTask={addTask} />
            <TaskList tasks={visibleTasks} onRemoveTask={removeTask} onToggleTask={toggleTask} />
        </>
    )
}

export default TaskBoard;
