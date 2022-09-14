import InputEdit from "../../InputEdit/InputEdit"
import iconDelete from "../../../images/iconDelete.png"
import iconEdit from "../../../images/iconEdit.svg"
import "./list.css"

const List = ({ item, edit, updateList, deleteList, onEdit, onNavigate, touchMove, touchEnd, active, title }) => {
    const tasksLength = item.tasks.filter(task => task.isCompleted === false).length
    const tasksLengthSpan = tasksLength === 0 ? '' : `(${tasksLength})`

    return <>
        {edit ?
            <li className="list" >
                <InputEdit
                    setUpdateValue={updateList}
                    valueProps={title}
                    item={item} />
            </li> :
            <li className="list" style={active ? { backgroundColor: "rgb(103 194 221)" } : {}}
                onClick={onNavigate} onTouchMove={touchMove} onTouchEnd={touchEnd}>
                <div className="list__info info-list">
                    <div className="info-list__color" style={{ backgroundColor: item.color.hex }}></div>
                    <h5>{title}</h5>
                    <span>{tasksLengthSpan}</span>
                </div>
                <div className={active ? "list__icons list__icons--active" : "list__icons"}>
                    <img className="list__icon"
                        src={iconEdit} alt="iconEdit" onClick={(evt) => onEdit(evt)} />
                    <img className="list__icon"
                        src={iconDelete} alt="iconDelete" onClick={(evt) => deleteList(evt, item.id)} />
                </div>
            </li >
        }
    </>
}

export default List