import httpService from './httpService';
export const taskService = {
    add,
    query,
    update,
    remove,
    start
};

async function add(task) {
    const addedTask = await httpService.post(`task`, task);
    return addedTask
}

async function query(filterBy) {
    // const params = (!filterBy) ? '' : utils.createQueryString(filterBy)
    return await httpService.get(`task`);
}

async function update(task) {
    return await httpService.put(`task/${task._id}`, task);
}

async function start(task) {
    return await httpService.put(`task/${task._id}/start`, task);
}

async function remove(taskId) {
    return await httpService.delete(`task/${taskId}`);
}