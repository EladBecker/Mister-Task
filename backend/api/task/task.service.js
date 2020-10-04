
const ObjectId = require('mongodb').ObjectId
const dbService = require('../../services/db.service')
const socketService = require('../socket/socket.service')
const externalService = require('./external.service')


module.exports = {
    query,
    getById,
    remove,
    update,
    add,
    performTask
}

const taskCollection = 'task'

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection(taskCollection)
        const tasks = await collection.find(criteria).toArray();
        return tasks
    } catch (err) {
        console.log('ERROR: cannot find tasks')
        throw err;
    }
}

async function getById(taskId) {
    const collection = await dbService.getCollection(taskCollection)
    try {
        const task = await collection.findOne({ "_id": ObjectId(taskId) })
        return task
    } catch (err) {
        console.log(`ERROR: cannot find task ${taskId}`)
        throw err;
    }
}

async function remove(taskId) {
    const collection = await dbService.getCollection(taskCollection)
    try {
        await collection.deleteOne({ "_id": ObjectId(taskId) })
    } catch (err) {
        console.log(`ERROR: cannot remove task ${taskId}`)
        throw err;
    }
}

async function update(task) {
    const collection = await dbService.getCollection(taskCollection)
    task._id = ObjectId(task._id);
    try {
        await collection.replaceOne({ "_id": task._id }, task)
        socketService.emitTaskUpdate(task)
        return task
    } catch (err) {
        console.log(`ERROR: cannot update task ${task._id}`)
        throw err;
    }
}

async function add(task) {
    const collection = await dbService.getCollection(taskCollection)
    try {
        await collection.insertOne(task);
        return task;
    } catch (err) {
        console.log(`ERROR: cannot add task`)
        throw err;
    }
}

async function performTask(task) { 
    try { 
        await externalService.execute(task);
        // update task for success
        task.doneAt = Date.now(); 
    } catch (error) { 
        // update task for error 
        throw error; 
    } finally { 
        // more updates for task
        task.triesCount++;
        task.lastTriedAt=Date.now();
        return update(task);
    } 
}

function _buildCriteria(filterBy) {
    const criteria = {};
    // if (filterBy.txt) {
    //     criteria.username = filterBy.txt
    // }
    // if (filterBy.minBalance) {
    //     criteria.balance = { $gte: +filterBy.minBalance }
    // }
    return criteria;
}


// async function query(query) {
//     let filter = {}
//     if (query.filter) {
//         // if query filter exists - parse it to an object
//         query.filter = query.filter.substring(1)
//         filter = JSON.parse('{"' + decodeURI(query.filter).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')

//         // if it has a bool as a string - turn it into a bool
//         for (const key in filter) {
//             if (filter[key] === 'true') filter[key] = true
//             if (filter[key] === 'false') filter[key] = false
//         }
//     }

//     // get collection
//     const collection = await dbService.getCollection(taskCollection)

//     // initialize
//     let boards;

//     // get collection size
//     const boardSize = await collection.find({isArchived:false}).count()

//     // get the board
//     try {
//         if (query.limit) {
//             boards = await collection.find(filter).limit(query.limit * 1).skip(query.skip * 1).toArray();
//         } else {
//             boards = await collection.find(filter).toArray()
//         }

//         return { boards, boardSize }
//     } catch (err) {
//         console.log('ERROR: cannot find tasks')
//         throw err;
//     }
// }

// async function queryWithMember(queryObj) {
//     const collection = await dbService.getCollection(taskCollection)
//     let boards = await collection.find(queryObj).toArray()
//     return boards
// }

// async function query() {
//     const collection = await dbService.getCollection(taskCollection)
//     console.log(collection)
//     try {
//         // tasks = await collection.toArray()
//         // return tasks
//         return collection
//     } catch (err) {
//         console.log('ERROR: cannot find tasks')
//         throw err;
//     }

// }