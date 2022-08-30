import InputEdit from "../../InputEdit/InputEdit"
import iconDelete from "../../../images/iconDelete.png"
import iconEdit from "../../../images/iconEdit.svg"
import "./list.css"

const List = ({ item, edit, updateList, deleteList, handleEdit, handleSubmit, active, title }) => {
    const tasksLength = item.tasks.filter(task => task.isCompleted === false).length
    return <>
        {edit ?
            <li className="list" >
                <InputEdit
                    setUpdateValue={updateList}
                    valueProps={title}
                    item={item} />
            </li> :
            <li className="list" style={active ? { backgroundColor: "rgb(103 194 221)" } : {}}
                onClick={() => alert("click")}>
                <div className="list__info info-list">
                    <div className="info-list__color" style={{ backgroundColor: item.color.hex }}></div>
                    <h5>{title}</h5>
                    <span>{tasksLength === 0 ? '' : `(${tasksLength})`}</span>
                </div>
                <div className="list__icons">
                    <img className="list__icon"
                        src={iconEdit} alt="iconEdit" onClick={(evt) => handleEdit(evt)} />
                    <img className="list__icon"
                        src={iconDelete} alt="iconDelete" onClick={(evt) => deleteList(evt, item.id)} />
                </div>
            </li >
        }
    </>
}

export default List