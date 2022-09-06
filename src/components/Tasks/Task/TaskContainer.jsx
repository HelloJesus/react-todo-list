import { useEffect, useState } from "react"
import "./task.css"
import Task from "./Task"
import axios from "axios"
import { useRef } from "react"


const TaskContainer = ({ item, withEmpty, setRemoveTask, setUpdateTask }) => {
    let [isChecked, setIsChecked] = useState(item.isCompleted)
    let [edit, setEdit] = useState(false)
    let [longTouch, setLongTouch] = useState(false)
    // let clickHoldTimer = null
    let touchTime = useRef(null)

    // const setTimer = () => {
    //     clickHoldTimer = setTimeout(() => {
    //         setLongTouch(true)
    //     }, 500);
    // }

    // const clearTimer = () => {
    //     clearTimeout(clickHoldTimer);
    // }

    const clickOut = (evt) => {
        if (evt.target.id !== 'taskEdit' && evt.target.id !== 'taskDelete') {
            window.removeEventListener("touchstart", clickOut)
            setLongTouch(false)
        }
    }

    const showMenuTask = () => {
        if (touchTime === 0) {
            touchTime = new Date().getTime();
        } else {
            if (((new Date().getTime()) - touchTime) < 500) {
                touchTime = 0
                setLongTouch(true)
                setTimeout(() => { window.addEventListener("touchstart", clickOut) }, 100)
            } else {
                touchTime = new Date().getTime();
            }
        }
    }
    // useEffect(() => {
    //     window.addEventListener("touchstart", clickOut)
    //     return () => {
    //         window.removeEventListener("touchstart", clickOut)
    //     }
    // }, [])

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
        // evt.preventDefault();
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
        // setTimer={setTimer}
        // clearTimer={clearTimer}
        longTouch={longTouch}
        setLongTouch={setLongTouch}
        showMenuTask={showMenuTask}
        withEmpty={withEmpty} />
}

export default TaskContainer