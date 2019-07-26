import mongoose from 'mongoose'
import CommentService from './CommentService'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId


let _schema = new Schema({
  title: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  listId: { type: ObjectId, ref: 'List', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true }
}, { timestamps: true })


_schema.pre('deleteMany', function (next) {
  Promise.all([
    CommentService.deleteMany({ boardId: this._conditions._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})

export default mongoose.model("Task", _schema)