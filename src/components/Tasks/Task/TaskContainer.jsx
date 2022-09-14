import { useEffect, useState } from "react"
import "./task.css"
import Task from "./Task"
import { useRef } from "react"
import { API } from "../../../api/api"


const TaskContainer = ({ item, withEmpty, setRemoveTask, setUpdateTask }) => {
    let [isChecked, setIsChecked] = useState(item.isCompleted)
    let [edit, setEdit] = useState(false)
    let [menuTask, setMenuTask] = useState(false)
    let touchTimeRef = useRef(null)

    //Создаем функцию, которая отслеживает наш клик, когда мобильное меню Task задействовано 
    const clickOut = (evt) => {
        if (evt.target.id !== 'taskEdit' && evt.target.id !== 'taskDelete') {
            window.removeEventListener("touchstart", clickOut)
            setMenuTask(false)
        }
    }
    //Создаем функцию, которая показывает нам мобильное меню Task при двойном touch клике
    const showMenuTask = () => {
        if (touchTimeRef === 0) {
            touchTimeRef = new Date().getTime();
        } else {
            if (((new Date().getTime()) - touchTimeRef) < 500) {
                touchTimeRef = 0
                setMenuTask(true)
                //оборачиваем прослушку в setTimeout, чтобы успеть загрузить меню
                setTimeout(() => { window.addEventListener("touchstart", clickOut) }, 100)
            } else {
                touchTimeRef = new Date().getTime();
            }
        }
    }

    useEffect(() => {
        setIsChecked(item.isCompleted)
    }, [item.isCompleted])

    const updateTask = (text, id, isCompleted) => {
        if (!text) {
            const result = window.confirm("Вы действительно хотите удалить текст?")
            if (result) {
                deleteTask(id)
                return
            } else {
                return
            }
        }

        API.updateTask(id, text, isCompleted).then(() => {
            setUpdateTask(id, text, isCompleted)
        }).catch((error) => {
            alert(`Не удалось обновиь задачу: ${error.message}`)
        })
        setMenuTask(false)
        setEdit(false)
    }

    const deleteTask = (id) => {
        API.deleteTask(id).then(() => {
            setRemoveTask(id, item.list)
        }).catch(error => {
            alert(`Не удалось удалить задачу: ${error.message}`)
        })
        setMenuTask(false)
    }

    const setCheckedTask = () => {
        setIsChecked(!isChecked)
        try {
            updateTask(item.text, item.id, !isChecked)
        } catch (error) {
            alert(`Не удалось выполнить задачу: ${error.message}`)
            setIsChecked(item.isCompleted)
        }
    }

    return <Task
        item={item}
        deleteTask={deleteTask}
        updateTask={updateTask}
        edit={edit}
        setEdit={setEdit}
        isChecked={isChecked}
        setCheckedTask={setCheckedTask}
        menuTask={menuTask}
        showMenuTask={showMenuTask}
        withEmpty={withEmpty} />
}

export default TaskContainer