import { useState } from "react"
import List from "./List"
import { API } from "../../../api/api"
import { useRef } from "react"

const ListContainer = ({ item, setNavigate, setRemoveList, setUpdateLists, setActiveList, setIsMobile, active }) => {
    let [edit, setEdit] = useState(false)
    let [title, setTitle] = useState(item.title)
    let touchStartRef = useRef(null)

    const onEdit = (evt) => {
        evt.stopPropagation()
        setEdit(!edit)
    }

    const onNavigate = () => {
        if (!touchStartRef.current) {
            setNavigate(item)
            // setIsMobile(false)
            setActiveList(item.id)
        }
    }

    const touchMove = (evt) => {
        touchStartRef.current = evt.type
    }

    const touchEnd = () => {
        if (touchStartRef.current !== 'touchmove') {
            setNavigate(item)
            setActiveList(item.id)
        }
        touchStartRef.current = null
    }

    const deleteList = (evt, id) => {
        evt.stopPropagation()
        API.deleteList(id).then(() => {
            setRemoveList(id)
        }).catch(error => {
            alert(`Не удалось удалить категорию: ${error.message}`)
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
        API.updateList(id, title).then(() => {
            setUpdateLists(title, id)
        }).catch(error => {
            alert(`Не удалось обновить категорию: ${error.message}`)
            setTitle(prevTitle)
        })
        setEdit(false)
    }

    return <List
        item={item}
        edit={edit}
        setEdit={setEdit}
        updateList={updateList}
        deleteList={deleteList}
        onEdit={onEdit}
        onNavigate={onNavigate}
        touchMove={touchMove}
        touchEnd={touchEnd}
        active={active}
        title={title}
    />
}

export default ListContainer