import { useState } from "react"
import AddList from "./AddList/AddList"
import ListContainer from "./List/ListContainer"
import "./lists.css"

const Lists = ({ lists, colors, setAddList, setRemoveList, setUpdateLists, setNavigate, navigate }) => {
    let [isMobile, setIsMobile] = useState(false)
    let [activeList, setActiveList] = useState(null)

    const handleSumbit = () => {
        navigate('/')
        setIsMobile(true)
        setActiveList(false)
    }

    return <><div className={isMobile ? "todo__lists" : "todo__lists lists-todo__active"}>
        <div className="lists-todo__inner">
            <div className="lists-all" onClick={handleSumbit}>All Tasks</div>
            <ul className="lists">
                {lists && lists.map((item, index) => {
                    return <ListContainer key={index}
                        item={item}
                        setRemoveList={setRemoveList}
                        setNavigate={setNavigate}
                        setUpdateLists={setUpdateLists}
                        active={item.id === activeList ? true : false}
                        setActiveList={setActiveList}
                    />
                })}
            </ul>
            <AddList lists={lists} colors={colors} setAddList={setAddList} />
        </div>
    </div>
        <div onClick={() => setIsMobile(!isMobile)} className={isMobile ? "todo__lists-toggler" : "todo__lists-toggler toggle"}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
        </div>
    </>
}

export default Lists