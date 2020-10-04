
const initialState = {
  tasks: []
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.tasks };
    case 'ADD_TASK':
      return { ...state, tasks: [action.addedTask, ...state.tasks] };
    case 'UPDATE_TASK':
      return {
        ...state, tasks: state.tasks.map(task => {
          if (task._id === action.task._id) task = action.task;
          return task;
        })
      }
    case 'REMOVE_TASK':
      return { ...state, tasks: state.tasks.filter(task => (task._id !== action.taskId)) }
    default:
      return state;
  }
}
