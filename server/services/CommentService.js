import mongoose from 'mongoose'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let _schema = new Schema({
  title: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  taskId: { type: ObjectId, ref: "Task", required: true }
  // listId: { type: ObjectId, ref: 'List', required: true },
  // boardId: { type: ObjectId, ref: 'Board', required: true }
}, { timestamps: true })

export default mongoose.model("Comment", _schema)