import mongoose, { Document, Schema, Types } from "mongoose";
import bcrypt from 'bcryptjs'


export interface UserDoc extends Document {
    _id: Types.ObjectId | string,
    name: string
    email: string,
    password: string,
    matchPassword(enteredPassword: string): Promise<boolean>,
}

const userSchema = new Schema<UserDoc>({
    email: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

export const UserModel = mongoose.model<UserDoc>('Users', userSchema);