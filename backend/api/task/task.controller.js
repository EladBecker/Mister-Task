const taskService = require('./task.service')
const queueService = require('./queue.service');
const logger = require('../../services/logger.service')
const socketService = require('../socket/socket.service');

let queue;

async function addTask(req, res) {
    try {
        const task = req.body;
        await taskService.add(task)
        queueService.enqueue(task)
        res.send(task)
    } catch (err) {
        logger.error('Cannot add task', err);
        res.status(500).send({ error: 'cannot add task' })
    }
}

async function getTasks(req, res) {
    try {
        const tasks = await taskService.query(req.query)
        queueService.fillQueue(tasks)
        res.send(tasks)
    } catch (err) {
        logger.error('Cannot get tasks', err);
        res.status(500).send({ error: 'Cannot get tasks' })

    }
}

async function getTask(req, res) {
    try {
        const task = await taskService.getById(req.params.id)
        res.send(task)
    } catch (err) {
        logger.error('Cannot get task', err);
        res.status(500).send({ error: 'cannot get task' })

    }
}

async function deleteTask(req, res) {
    try {
        await taskService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete task', err);
        res.status(500).send({ error: 'cannot delete task' })

    }
}

async function updateTask(req, res) {
    try {
        const task = req.body;
        const updatedTask = await taskService.update(task)
        socketService.emitTaskUpdate(updatedTask)
        res.send(task)
    } catch (err) {
        logger.error('Cannot update task', err);
        res.status(500).send({ error: 'cannot update task' })
    }
}

async function performTask(req, res) {
    try {
        const task = req.body;
        const updatedTask = await taskService.performTask(task);
        res.send(updatedTask);
    } catch (err) {
        logger.error('task failed', err);
        res.status(500).send({ error: 'task failed' })
    }
}

module.exports = {
    addTask,
    getTask,
    updateTask,
    deleteTask,
    getTasks,
    performTask
}