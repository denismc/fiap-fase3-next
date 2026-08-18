'use client'

import React from "react";
import type { Task } from "../../types";
import styled from "styled-components";
import { useTrash } from "../../contexts/TrashContext";

interface CompletedTasksProps {
    tasks: Task[]
}

const List = styled.ul`
    list-style:none;
    padding: 0;
    width: 50vw;
`

const ListItem = styled.li`
    border: 1px solid #ccc;
    padding: 10px;
    margin: 5px 0;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const CompletedTasks: React.FC<CompletedTasksProps> = ({ tasks }) => {
    const { hiddenIds } = useTrash();
    const completedTasks = tasks.filter(task => task.completed && !hiddenIds.has(task.id));

    return (
        <div>
            <h1>Tarefas Concluídas</h1>
            <List>
                {completedTasks.map(task => (
                    <ListItem key={task.id}>
                        <span>{task.name}</span>
                        <span>{task.completedAt ? new Date(task.completedAt).toLocaleString() : ''}</span>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default CompletedTasks