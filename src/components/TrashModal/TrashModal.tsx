'use client'

import React from "react";
import styled from "styled-components";
import { useTrash } from "../../contexts/TrashContext";

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 100;
`

const Panel = styled.aside`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(360px, 90vw);
    background: white;
    color: #171717;
    box-shadow: -2px 0 12px rgba(0, 0, 0, 0.2);
    z-index: 101;
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const PanelHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`

const CloseButton = styled.button`
    background: none;
    border: none;
    color: inherit;
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;

    &:focus-visible {
        outline: 2px solid #ed145b;
    }
`

const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    flex: 1;
    overflow-y: auto;
`

const ListItem = styled.li`
    border: 1px solid #ccc;
    padding: 10px;
    margin: 5px 0;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
`

const RestoreButton = styled.button`
    background: none;
    border: 1px solid #ed145b;
    color: #ed145b;
    border-radius: 4px;
    cursor: pointer;
    padding: 4px 10px;
    white-space: nowrap;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
        background-color: #ed145b;
        color: white;
    }
`

const EmptyMessage = styled.p`
    color: #666;
`

const EmptyTrashButton = styled.button`
    background-color: #ed145b;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 10px;
    margin-top: 20px;
    transition: background-color 0.3s ease;

    &:hover:not(:disabled) {
        background-color: #c10e49;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`

const TrashModal: React.FC = () => {
    const { isOpen, trashedTasks, closeTrash, emptyTrash, restoreFromTrash } = useTrash();

    if (!isOpen) return null;

    return (
        <>
            <Overlay onClick={closeTrash} />
            <Panel>
                <PanelHeader>
                    <h2>Lixeira</h2>
                    <CloseButton onClick={closeTrash} aria-label="Fechar lixeira">&times;</CloseButton>
                </PanelHeader>
                {trashedTasks.length === 0 ? (
                    <EmptyMessage>Nenhum item na lixeira.</EmptyMessage>
                ) : (
                    <List>
                        {trashedTasks.map((task) => (
                            <ListItem key={task.id}>
                                <span>{task.name}</span>
                                <RestoreButton onClick={() => restoreFromTrash(task)}>
                                    Restaurar
                                </RestoreButton>
                            </ListItem>
                        ))}
                    </List>
                )}
                <EmptyTrashButton onClick={emptyTrash} disabled={trashedTasks.length === 0}>
                    Esvaziar lixeira
                </EmptyTrashButton>
            </Panel>
        </>
    )
}

export default TrashModal;
