'use client'

import api from "@/services/api"
import { Task } from "@/types"
import React, { createContext, useState, useContext } from "react"

interface TrashContextValue {
    trashedTasks: Task[],
    hiddenIds: Set<Task['id']>,
    isOpen: boolean,
    moveToTrash: (task: Task) => void,
    restoreFromTrash: (task: Task) => void,
    emptyTrash: () => Promise<void>,
    openTrash: () => void,
    closeTrash: () => void
}

const TrashContext = createContext<TrashContextValue | undefined>(undefined)

export function TrashProvider({ children }: { children: React.ReactNode }) {
  const [trashedTasks, setTrashedTasks] = useState<Task[]>([])
  const [deletedIds, setDeletedIds] = useState<Set<Task['id']>>(new Set())
  const [isOpen, setIsOpen] = useState(false)

  const moveToTrash = (task: Task) =>
    setTrashedTasks(prev => prev.some(t => t.id === task.id) ? prev : [...prev, task])

  const restoreFromTrash = (task: Task) =>
    setTrashedTasks(prev => prev.filter(t => t.id !== task.id))

  const emptyTrash = async () => {
    await Promise.all(trashedTasks.map(task => api.delete(`/tasks/${task.id}`)))
    setDeletedIds(prev => new Set([...prev, ...trashedTasks.map(task => task.id)]))
    setTrashedTasks([])
  }

  const openTrash = () => setIsOpen(true)
  const closeTrash = () => setIsOpen(false)

  const hiddenIds = new Set([...trashedTasks.map(task => task.id), ...deletedIds])

  return (
    <TrashContext.Provider
      value={{ trashedTasks, hiddenIds, isOpen, moveToTrash, restoreFromTrash, emptyTrash, openTrash, closeTrash }}
    >
      {children}
    </TrashContext.Provider>
  )
}

export function useTrash() {
  const ctx = useContext(TrashContext)
  if (!ctx) throw new Error('useTrash deve ser usado dentro de TrashProvider')
  return ctx
}
