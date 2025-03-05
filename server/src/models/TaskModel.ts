import mongoose, { Document, Schema, Types } from "mongoose";


export interface TaskDoc extends Document {
    _id: Types.ObjectId | string,
    userId: Types.ObjectId ,
    title: string
    description: string,
}

const taskSchema = new Schema<TaskDoc>({
    userId: {
        ref:'Users',
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });


export const TaskModel = mongoose.model<TaskDoc>('Tasks', taskSchema);