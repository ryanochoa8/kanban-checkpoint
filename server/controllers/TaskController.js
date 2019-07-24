import _taskService from '../services/TaskService.js'
import express from 'express'
import { Authorize } from '../middleware/authorize.js'
// add and remove (inside the list)
// move between lists
// TODO add remove comments to task
export default class TaskController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('', this.getAll)
      .post('', this.addTask)
      // .put(':/id/listId', this.changeLists)
      .delete('/:id', this.deleteTask)
  }
  async getAll(req, res, next) {
    try {
      //only gets boards by user who is logged in
      let data = await _taskService.find({ authorId: req.session.uid })
      return res.send(data)
    }
    catch (err) { next(err) }
  }
  async addTask(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _taskService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }
  async deleteTask(req, res, next) {
    try {
      await _taskService.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      return res.send("Successfully deleted")
    } catch (error) {
      next(error)
    }
  }
  // TODO fix this 
  // async changeLists(req, res, next) {
  //   try {
  //     await _taskService.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
  //     return res.send("Successfully updated")
  //   } catch (error) {
  //     next(error)
  //   }
  // }

}



