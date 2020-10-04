import { taskService } from "../../services/taskService";

export function addTask(task) {
  return async dispatch => {
    try {
      const addedTask = await taskService.add(task);
      dispatch({ type: 'ADD_TASK', addedTask });
    } catch (err) {
      console.log(`error: couldn't add task`, err)
    }
  }
}

export function updateTask(task) {
  return /*async*/ dispatch => {
    try {
      // await taskService.update(task)
      dispatch({ type: 'UPDATE_TASK', task });
    } catch (err) {
      console.log(`error: couldn't update task ${task._id}`, err)
    }
  }
}

export function startTask(task) {
  return async dispatch => {
    try {
      await taskService.start(task)
    } catch (err) {
      console.log(`error: couldn't update task ${task._id}`, err)
    }
  }
}

export function removeTask(taskId) {
  return async dispatch => {
    try {
      await taskService.remove(taskId)
      dispatch({ type: 'REMOVE_TASK', taskId });
    } catch (err) {
      console.log(`error: couldn't remove task ${taskId}`, err)
    }
  }
}


export function loadTasks() {
  return async dispatch => {
    try {
      const tasks = await taskService.query();
      dispatch({ type: 'SET_TASKS', tasks });
    } catch (err) {
      console.log(`error: couldn't get tasks`, err);
      throw err;
    }
  };
}


