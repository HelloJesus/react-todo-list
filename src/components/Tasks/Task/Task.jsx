import Badge from "./Badge/Badge"
import iconDelete from "../../../images/iconDelete.png"
import iconEdit from "../../../images/iconEdit.svg"
import isSuccess from "../../../images/isSuccess.svg"
import "./task.css"
import InputEdit from "../../InputEdit/InputEdit"


const Task = ({ item, text, deleteTask, updateTask, edit, setEdit, isChecked, setCheckedTask, visible, setVisible, withEmpty }) => {
    const handleMouseEnter = () => {
        setVisible(true)
    }
    const handleMouseLeave = () => {
        setVisible(false)
    }

    return < li className={edit ? "task task--bg" : visible ? "task task--bg" : "task"}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
    >
        {edit
            ? <InputEdit
                setUpdateValue={updateTask}
                valueProps={item.text}
                item={item} />
            : <>
                <div className="task__info info-task">
                    <label className="info-task__checkbox">
                        {isChecked ? <img src={isSuccess} alt="isSuccess" /> : ""}
                        <input type="checkbox" checked={isChecked || ""} onChange={(evt) => setCheckedTask(evt)} />
                        <span></span>
                    </label>
                    {isChecked
                        ? <p className="info-task__text" style={{ textDecoration: "line-through", color: "#EB5757" }}>{item.text}</p>
                        : <p className="info-task__text" >{item.text}</p>}
                    {withEmpty && <Badge text={item.listTitle} color={item.color} />}
                </div>
                {/* <div className="icons-container"></div> */}
                <div className={visible ? "task__icons task__icons--on" : "task__icons task__icons--off"}>
                    <img className="icon--edit" src={iconEdit} alt="iconEdit" onClick={() => setEdit(true)} />
                    <img className="icon--delete" src={iconDelete} alt="iconDelete" onClick={() => deleteTask(item.id)} />
                </div>

            </>
        }
    </li >
}
export default Task