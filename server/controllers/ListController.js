// get all lists
// delete lists
// create lists
import _listService from '../services/ListService.js'
import _taskService from '../services/TaskService.js'
import express from 'express'
import { Authorize } from '../middleware/authorize.js'


export default class ListsController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:listId/tasks', this.getTasksByListId)
      .post('', this.create)
      // .put('/:id', this.edit)
      .delete('/:id', this.delete)
      .use(this.defaultRoute)

  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }
  async getAll(req, res, next) {
    try {
      //only gets boards by user who is logged in
      let data = await _listService.find({ authorId: req.session.uid })
      return res.send(data)
    }
    catch (err) { next(err) }
  }
  async getByBoardId(req, res, next) {
    try {
      let data = await _listService.find({ boardId: req.params.boardId })
      return res.send(data)
    }
    catch (err) { next(err) }
  }
  async getById(req, res, next) {
    try {
      let data = await _listService.findOne({ _id: req.params.id, authorId: req.session.uid })
      return res.send(data)
    } catch (error) { next(error) }
  }
  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _listService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }
  async delete(req, res, next) {
    try {
      await _listService.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
  async getTasksByListId(req, res, next) {
    try {
      let data = await _taskService.find({ listId: req.params.listId })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

}