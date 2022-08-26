import { useState } from "react"
import axios from "axios"
import List from "./List"

const api = "http://localhost:5000/lists/"

const ListContainer = ({ item, setNavigate, setRemoveList, setUpdateLists, setActiveList, active }) => {
    let [edit, setEdit] = useState(false)
    let [visible, setVisible] = useState(false)
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
        axios.delete(api + id).then(() => {
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
        axios.patch(api + id, {
            title: title,
        }).then(() => {
            setUpdateLists(title, id)
        }).catch(() => {
            alert('Не удалось обновить категорию')
            setTitle(prevTitle)
        })
        setEdit(false)
        setVisible(false)
    }

    return <List
        item={item}
        edit={edit}
        visible={visible}
        setVisible={setVisible}
        updateList={updateList}
        deleteList={deleteList}
        handleEdit={handleEdit}
        handleSubmit={handleSubmit}
        active={active}
        title={title}
    />
}

export default ListContainer