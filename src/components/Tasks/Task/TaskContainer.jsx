import { useEffect, useState } from "react"
import "./task.css"
import Task from "./Task"
import axios from "axios"

const api = "https://react-todolist-heroku.herokuapp.com/"

const TaskContainer = ({ item, setRemoveTask, setUpdateTask, withEmpty }) => {
    let [isChecked, setIsChecked] = useState(item.isCompleted)
    let [edit, setEdit] = useState(false)
    let [visible, setVisible] = useState(false)

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

        axios.patch(api + id, {
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
        setVisible(false)
    }

    const deleteTask = (id) => {
        axios.delete(api + id).then(() => {
            setRemoveTask(id, item.list)
        }).catch(() => {
            alert("Не удалось удалить задачу")
        })
    }

    const setCheckedTask = () => {
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
        visible={visible}
        setVisible={setVisible}
        isChecked={isChecked}
        setCheckedTask={setCheckedTask}
        withEmpty={withEmpty} />
}

export default TaskContainer