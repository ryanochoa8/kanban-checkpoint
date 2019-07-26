import _commentService from '../services/CommentService.js'
import express from 'express'
import { Authorize } from '../middleware/authorize.js'



export default class CommentController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      // .get('/:id', this.getCommentsById)
      .post('', this.createComment)
      .delete('/:id', this.deleteComment)
  }

  // async getCommentsById(req, res, next) {
  //   try {
  //     let data = await _commentService.findOne({ _id: req.params.id, authorId: req.session.uid })
  //     return res.send(data)
  //   } catch (error) { next(error) }
  // }
  async createComment(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _commentService.create(req.body)
      return res.status(201).send(data)
    } catch (error) {
      next(error)
    }
  }
  async deleteComment(req, res, next) {
    try {
      await _commentService.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      return res.send("Successfully deleted")
    } catch (error) {
      next(error)
    }
  }

}
