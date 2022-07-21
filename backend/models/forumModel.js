import mongoose from "mongoose"
const { Schema, model} = mongoose

const forumSchema = new Schema({
    title: { type: String, required: true},
    content: { type: String, required: true},
    author: { type: Schema.Types.ObjectId, ref:"user", required: true},
    createdAt: {type: Date, default:(Date.now() - (4*60*60*1000))},
    updatedAt: {type: Date, default:(Date.now() - (4*60*60*1000))}
})

export const ForumPost = model('postForo', forumSchema)