import { useState } from "react"
import axios from "axios"
import List from "./List"


const ListContainer = ({ item, setNavigate, setRemoveList, setUpdateLists, setActiveList, active }) => {
    let [edit, setEdit] = useState(false)
    let [title, setTitle] = useState(item.title)

    const handleEdit = (evt) => {
        evt.stopPropagation()
        setEdit(true)
    }

    const handleSubmit = () => {
        setNavigate(item)
        setActiveList(item.id)
    }

    const deleteList = (evt, id) => {
        evt.stopPropagation()
        axios.delete("https://react-todolist-heroku.herokuapp.com/lists/" + id).then(() => {
            setRemoveList(id)
        }).catch(() => {
            alert('Не удалось удалить категорию')
        })
    }

    const updateList = (title, id) => {
        //Если строка пустая, даем выбор юзеру, удалять или редактировать
        if (!title) {
            const result = window.confirm("Вы действительно хотите удалить категорию?")
            if (result) {
                deleteList()
                return
            } else {
                return
            }
        }

        const prevTitle = item.title
        setTitle(title)
        axios.patch("https://react-todolist-heroku.herokuapp.com/lists/" + id, {
            title: title,
        }).then(() => {
            setUpdateLists(title, id)
        }).catch(() => {
            alert('Не удалось обновить категорию')
            setTitle(prevTitle)
        })
        setEdit(false)
    }

    return <List
        item={item}
        edit={edit}
        updateList={updateList}
        deleteList={deleteList}
        handleEdit={handleEdit}
        handleSubmit={handleSubmit}
        active={active}
        title={title}
    />
}

export default ListContainer