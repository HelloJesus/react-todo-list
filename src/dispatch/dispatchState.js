export const dispatchState = {
    setList(data, list) {
        return {
            ...data,
            lists: [...data.lists, list]
        }
    },
    updateList(data, title, id) {
        return {
            ...data,
            lists: [
                ...data.lists.map(list => {
                    return list.id === id ? { ...list, title } : list
                })
            ]
        }
    },
    removeList(data, id) {
        return {
            ...data,
            lists: [
                ...data.lists.filter(list => list.id !== id)
            ],
            tasks: [
                ...data.tasks.filter(task => task.id !== id)
            ]
        }
    },
    addTask(data, task) {
        return {
            ...data,
            lists: [
                ...data.lists.map(list => {
                    if (list.id === task.listId) {
                        list.tasks = [...list.tasks, task]
                    }
                    return list
                })
            ],
            tasks: [...data.tasks, task]
        }
    },
    updateTask(data, idTask, text, isCompleted) {
        return {
            ...data,
            lists: [
                ...data.lists.map(list => {
                    list.tasks.map(task => {
                        if (task.id === idTask) {
                            task.text = text
                            task.isCompleted = isCompleted
                        }
                        return task
                    })
                    return list
                })
            ],
            tasks: [
                ...data.tasks.map(task => {
                    if (task.id === idTask) {
                        task.text = text
                        task.isCompleted = isCompleted
                    }
                    return task
                })
            ]
        }
    },
    removeTask(data, id) {
        return {
            ...data,
            lists: [
                ...data.lists.filter(list => {
                    list.tasks = list.tasks.filter(task => task.id !== id)
                    return list
                })
            ],
            tasks: [
                ...data.tasks.filter((task) => task.id !== id)
            ]
        }
    }
}