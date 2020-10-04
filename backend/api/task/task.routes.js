const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getTasks, getTask, updateTask, deleteTask, addTask, performTask } = require('./task.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getTasks)
router.get('/:id', getTask)
router.post('/', addTask)
// router.put('/:id', requireAuth, updateTask)
router.put('/:id', updateTask)
router.put('/:id/start', performTask)
// router.delete('/:id', requireAuth, deleteTask)
router.delete('/:id', deleteTask)
module.exports = router