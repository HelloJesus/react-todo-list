import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import AddList from "./AddList/AddList"
import ListContainer from "./List/ListContainer"
import "./lists.css"

const Lists = ({ lists, colors, setAddList, setRemoveList, setUpdateLists, setNavigate, navigate, activeListId }) => {
    let [isMobile, setIsMobile] = useState(false)
    let [activeList, setActiveList] = useState(null)
    const scrollRef = useRef(null)

    // При обновлении страницы запоминать id элемента в списке, чтобы выделять его цветом
    useEffect(() => {
        if (activeListId) setActiveList(activeListId.id)
    }, [activeListId])

    // Создаем функцию, которая будет автоматически скроллить нас до нового, добавленного элемента в список
    const scrollToRef = () => {
        scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight)
    }

    const handleSumbit = () => {
        setActiveList(false)
        navigate('/')
        setIsMobile(false)
        document.body.style.overflowY = "scroll"
    }

    const onMobile = () => {
        setIsMobile(!isMobile)
        // document.body.style.overflowY = isMobile ? "auto" : "hidden"
        // if (isMobile) {
        //     document.body.style.overflowY = "auto"
        //     document.body.style.height = "auto"
        // } else {
        //     document.body.style.overflowY = "hidden"
        //     document.body.style.height = "100%"
        // }

    }

    return <><div className={isMobile ? "todo__lists lists-todo__active" : "todo__lists"}>
        <div className="lists-todo__inner">
            <div className="lists-all" onClick={handleSumbit}>All Tasks</div>
            <ul className="lists" ref={scrollRef}>
                {lists && lists.map((item, index) => {
                    return <ListContainer
                        key={item.id}
                        item={item}
                        setRemoveList={setRemoveList}
                        setNavigate={setNavigate}
                        setUpdateLists={setUpdateLists}
                        setActiveList={setActiveList}
                        setIsMobile={setIsMobile}
                        active={item.id === activeList ? true : false}
                    />
                })}
            </ul>
            <AddList lists={lists} colors={colors} setAddList={setAddList} scrollToRef={scrollToRef} />
        </div>
    </div>
        <div onClick={() => onMobile()} className={isMobile ? "todo__lists-toggler toggle" : "todo__lists-toggler"}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
        </div>
    </>
}

export default Lists