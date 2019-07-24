import _taskService from '../services/TaskService.js'
import express from 'express'
import { Authorize } from '../middleware/authorize.js'
// add and remove (inside the list)
// move between lists
// TODO add remove comments to task
export default class TaskController {
  constructor() {
    this.router = express.Router()

  }

}

