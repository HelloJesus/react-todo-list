import { useState } from "react"
import TaskContainer from "./Task/TaskContainer"
import "./tasks.css"
import axios from "axios"

const api = "https://react-todolist-heroku.herokuapp.com/tasks"

const Tasks = ({ setAddTask, setRemoveTask, setUpdateTask, withEmpty, items }) => {
    let [valueTask, setValueTask] = useState('')

    let title = ''
    let color = ''
    const list = items.lists

    const addTask = () => {
        const objTask = {
            listId: list.id,
            text: valueTask,
            isCompleted: false
        }

        axios.post(api, objTask).then(({ data }) => {
            setAddTask(data)
            setValueTask('')
        })
    }

    return <div className="tasks__list">
        {!withEmpty && <>
            <h2 style={{ color: list.color.hex }}>{list.title}</h2>
            <div className="tasks__list-input">
                <input className="" type="text" value={valueTask}
                    onChange={e => setValueTask(e.target.value)} placeholder="Add a new task"></input>
                {valueTask ? <button onClick={() => addTask()}>Добавить</button> : ''}
            </div>
        </>
        }
        <ul className="tasks">
            {items.tasks && items.tasks.map((task, index) => {
                if (list.length > 1) {
                    color = list.filter(item => item.id === task.listId)[0].color.hex
                    title = list.filter(item => item.id === task.listId)[0].title
                } else if (task.listId === task.id) {
                    title = list.title
                    color = list.color.hex
                }
                return <TaskContainer key={index}
                    item={{ ...task, listTitle: title, color: color, list: items.list }}
                    withEmpty={withEmpty}
                    setRemoveTask={setRemoveTask}
                    setUpdateTask={setUpdateTask}
                />
            })}
        </ul>
    </div>
}

export default Tasks