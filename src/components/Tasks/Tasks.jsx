import { useState } from "react"
import TaskContainer from "./Task/TaskContainer"
import "./tasks.css"
import { API } from "../../api/api"

const Tasks = ({ items, setAddTask, setRemoveTask, setUpdateTask, withEmpty }) => {
    let [valueTask, setValueTask] = useState('')

    let title = ''
    let color = ''
    const list = items.lists

    const addTask = () => {
        API.addTask(list.id, valueTask).then(({ data }) => {
            setAddTask(data)
            setValueTask('')
        }).catch(error => {
            alert(`Не удалось добавить задачу: ${error.message}`)
        })
    }

    return <div className="tasks__list" >
        {!withEmpty ? <>
            <h2 className="tasks__list-title" style={{ color: list.color.hex }}>{list.title}</h2>
            <div className="tasks__list-input">
                <input className="" type="text" value={valueTask}
                    onChange={e => setValueTask(e.target.value)} placeholder="Add a new task"></input>
                {valueTask ? <button onClick={() => addTask()}>Добавить</button> : ''}
            </div>
        </> : <h2 className="tasks-title">All Tasks</h2>
        }
        <ul className="tasks">
            {items.tasks && items.tasks.map((task) => {
                if (list.length > 1) {
                    color = list.filter(item => item.id === task.listId)[0].color.hex
                    title = list.filter(item => item.id === task.listId)[0].title
                } else if (task.listId === task.id) {
                    title = list.title
                    color = list.color.hex
                }
                return <TaskContainer
                    key={task.id}
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