import { useEffect, useState } from "react"
import "./task.css"
import Task from "./Task"
import axios from "axios"


const TaskContainer = ({ item, withEmpty, setRemoveTask, setUpdateTask }) => {
    let [isChecked, setIsChecked] = useState(item.isCompleted)
    let [edit, setEdit] = useState(false)
    let [visible, setVisible] = useState(false)
    let [longTouch, setLongTouch] = useState(false)
    let clickHoldTimer = null;

    const setTimer = () => {
        clickHoldTimer = setTimeout(() => {
            setLongTouch(true)
        }, 500);
    }

    const clearTimer = () => {
        clearTimeout(clickHoldTimer);
    }

    const clickOut = (evt) => {
        if (evt.target.className !== 'task__edit') setLongTouch(false)

    }
    useEffect(() => {
        window.addEventListener("touchstart", clickOut)
        return () => {
            window.removeEventListener("touchstart", clickOut)
        }
    }, [])

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

        axios.patch("https://react-todolist-heroku.herokuapp.com/tasks/" + id, {
            text: text,
            isCompleted: isCompleted
        }).then(() => {
            setUpdateTask(id, text, isCompleted)
        }).catch((error) => {
            if (error.response) {
                alert('Возникла ошибка на сервере')
            } else {
                alert('Возникла ошибка, которая не известна, сообщите в телеграм')
            }
        })
        setEdit(false)
    }

    const deleteTask = (id) => {
        setLongTouch(false)
        axios.delete("https://react-todolist-heroku.herokuapp.com/tasks/" + id).then(() => {
            setRemoveTask(id, item.list)
        }).catch(() => {
            alert("Не удалось удалить задачу")
        })
    }

    const setCheckedTask = (evt) => {
        // evt.stopPropagation()
        evt.preventDefault();
        console.log(evt)
        setIsChecked(!isChecked)
        try {
            updateTask(item.text, item.id, !isChecked)
        } catch (error) {
            if (error.response) {
                alert('Возникла ошибка на сервере')
                setIsChecked(item.isCompleted)
            } else {
                alert('Возникла ошибка, которая не известна, сообщите ее в телеграм')
            }
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
        setTimer={setTimer}
        clearTimer={clearTimer}
        longTouch={longTouch}
        setLongTouch={setLongTouch}
        withEmpty={withEmpty} />
}

export default TaskContainer