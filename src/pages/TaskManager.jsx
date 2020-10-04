import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addTask, updateTask, removeTask, loadTasks, startTask } from '../store/actions/taskActions';
import socketService from '../services/socketService.js'
import { Task } from '../cmps/Task';
import { AddTask } from '../cmps/AddTask';

class _TaskManager extends Component {

  async componentDidMount() {

    socketService.setup()
    try {
      await this.props.loadTasks();
      socketService.emit('entered-task-manager', 'hello')
      socketService.on('task-updated', updatedTask => this.props.updateTask(updatedTask))
    } catch (err) {
      console.log('Oops! we seem to be missing the board you\'re looking for. going back to board selection.');
    }
  }

  componentWillUnmount() {
    socketService.off('task-updated')
    socketService.terminate()
  }

  onAddTask = async (ev) => {
    ev.preventDefault();
    const title = ev.target.title.value;
    const importance = ev.target.importance.value;
    ev.target.title.value = '';
    ev.target.importance.value = 1;
    const task = {
      title,
      description: '',
      importance,
      createdAt: Date.now(),
      triesCount: 0,
      lastTriedAt: null,
      doneAt: null
    }
    await this.props.addTask(task);
    // await this.props.loadTasks();
  }

  onStartTask = async (task) => {
    await this.props.startTask(task);
    await this.props.loadTasks();
  }

  onRemoveTask = async (taskId) => {
    await this.props.removeTask(taskId);
    await this.props.loadTasks();
  }

  render() {
    const { tasks } = this.props;
    if (!tasks || tasks.length === 0) return <div className="loading">Loading</div>;
    return (
      <div className="task-manager">
        <h1>Tasks</h1>
        <AddTask onAddTask={this.onAddTask} />
        <ul>
          {tasks.map(task => {
          return <li key={task._id}>
            <Task task={task}
              onRemoveTask={this.onRemoveTask}
              onStartTask={this.onStartTask} />
          </li>})}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.taskReducer.tasks,
  };
};

const mapDispatchToProps = {
  addTask,
  updateTask,
  removeTask,
  loadTasks,
  startTask
};

export const TaskManager = connect(mapStateToProps, mapDispatchToProps)(_TaskManager);
