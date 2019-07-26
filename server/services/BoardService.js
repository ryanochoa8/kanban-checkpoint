import mongoose from "mongoose"
import ListService from './ListService'
import TaskService from './TaskService'
import CommentService from './CommentService'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId



let _schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true }
}, { timestamps: true })

_schema.pre('findOneAndRemove', function (next) {
  Promise.all([
    ListService.deleteMany({ boardId: this._conditions._id }),
    TaskService.deleteMany({ boardId: this._conditions._id }),
    CommentService.deleteMany({ boardId: this._conditions._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})

export default mongoose.model('Board', _schema)