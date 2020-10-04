const taskService = require('./task.service')
let queue;

function fillQueue(tasks) {
    queue = tasks.sort((task1, task2) => {
        const triesDiff = task1.triesCount - task2.triesCount;
        if (triesDiff > 0 || triesDiff < 0) return triesDiff;
        return task1.importance - task2.importance;
    });
    queue = queue.filter(task => !task.doneAt);
    _handleQueue();
}

function enqueue(task){
    queue.unshift(task);
}

function _handleQueue() {
    const queueInterval = setInterval(async () => {
        if (!queue.length) clearInterval(queueInterval);
        else {
            const currTask = queue.shift();
            console.log(currTask)
            const updatedTask = await taskService.performTask(currTask);
            if (!updatedTask.doneAt) queue.push(updatedTask);
        }
    }, 1000*5);
}

module.exports = {
    fillQueue,
    enqueue
};