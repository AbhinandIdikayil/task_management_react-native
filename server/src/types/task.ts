

export type TaskTypeRepo = {
    userId: string,
    title: string,
    description: string
}
export type Task = {
    title: string,
    description: string
}

export type updateTaskByIdType = {
    title?: string,
    description?: string
}