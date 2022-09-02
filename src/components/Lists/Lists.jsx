import { useState } from "react"
import AddList from "./AddList/AddList"
import ListContainer from "./List/ListContainer"
import "./lists.css"

const Lists = ({ lists, colors, setAddList, setRemoveList, setUpdateLists, setNavigate, navigate }) => {
    let [isMobile, setIsMobile] = useState(false)
    let [activeList, setActiveList] = useState(null)

    const handleSumbit = () => {
        navigate('/')
        setIsMobile(false)
        setActiveList(false)
    }

    return <><div className={isMobile ? "todo__lists lists-todo__active" : "todo__lists"}>
        <div className="lists-todo__inner">
            <div className="lists-all" onClick={handleSumbit}>All Tasks</div>
            <ul className="lists">
                {lists && lists.map((item) => {
                    return <ListContainer key={item.id}
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
            <AddList lists={lists} colors={colors} setAddList={setAddList} />
        </div>
    </div>
        <div onClick={() => setIsMobile(!isMobile)} className={isMobile ? "todo__lists-toggler toggle" : "todo__lists-toggler"}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
        </div>
    </>
}

export default Lists