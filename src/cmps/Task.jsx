import React, { Component } from 'react'
import { Subtitles, Subject, ErrorOutline, Schedule, PlayCircleOutline, PlayArrow, Delete, CheckCircleOutline, Replay } from '@material-ui/icons/';

export class Task extends Component {
    render() {
        const { task, onRemoveTask, onStartTask } = this.props;
        return (
            <div className="task-container">
                <div className="task-details">
                    <h2>
                        <Subtitles fontSize="small" />
                        <span className="sub-section">{task.title}</span>
                    </h2>
                    <p className="task-code">{`code: ${task._id}`}</p>
                    <div className="description-container">
                        <Subject fontSize="small" />
                        <div className="description">
                            <span className="sub-section">Description:</span>
                            <textarea defaultValue={task.description}></textarea>
                        </div>
                    </div>
                    <div className="importance">
                        <ErrorOutline fontSize="small" />
                        <span className="sub-section">Importance:</span>
                        {task.importance}
                    </div>
                    <div className="created-at">
                        <Schedule fontSize="small" />
                        <span className="sub-section">Created At:</span>
                        {(new Date(task.createdAt)).toLocaleString()}
                    </div>
                    <div className="tries-count">
                        <PlayCircleOutline fontSize="small" />
                        <span className="sub-section">Tries Counter:</span>
                        {task.triesCount}
                    </div>
                    <div className="last-tried-at">
                        <Replay fontSize="small" />
                        <span className="sub-section">Last Tried At:</span>
                        {(new Date(task.lastTriedAt)).toLocaleString()}
                    </div>
                    <div className="done-at">
                        <CheckCircleOutline fontSize="small" />
                        <span className="sub-section">Done At:</span>
                        <span className={(task.doneAt) ? 'done' : 'not-done'}>
                            {(task.doneAt) ? (new Date(task.doneAt)).toLocaleString() : 'Not Done Yet...'}
                        </span>
                    </div>
                </div>
                <div className="task-actions">
                    <button className="btn-cancel" onClick={() => onRemoveTask(task._id)}>
                        <Delete fontSize="small" /> {`Delete`}
                    </button>
                    <button className="btn-approve" disabled={task.doneAt} onClick={() => onStartTask(task)}>
                        <PlayArrow fontSize="small" /> {`Start`}
                    </button>
                </div>
            </div>
        )
    }
}