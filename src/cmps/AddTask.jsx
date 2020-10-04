import React from 'react'
import { Add } from '@material-ui/icons'

export function AddTask({ onAddTask }) {
    return (
        <div className="add-task-container">
            <form onSubmit={(ev) => onAddTask(ev)}>
                <button className="btn-approve"><Add fontSize="small" /></button>
                <input type="text" name="title" placeholder="What needs to be done?" />
                <select name="importance">
                    <optgroup label="Importance">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </optgroup>
                </select>
            </form>
        </div>
    )
}
