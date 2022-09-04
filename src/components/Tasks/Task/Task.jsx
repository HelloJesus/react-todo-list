import Badge from "./Badge/Badge"
import iconDelete from "../../../images/iconDelete.png"
import iconEdit from "../../../images/iconEdit.svg"
import isSuccess from "../../../images/isSuccess.svg"
import "./task.css"
import InputEdit from "../../InputEdit/InputEdit"


const Task = ({ item, deleteTask, updateTask, edit, setEdit, isChecked, setCheckedTask, longTouch, handleDoubleMenu, withEmpty }) => {

    return < li className={edit ? "task task--bg" : "task"}>
        {edit
            ? <InputEdit
                setUpdateValue={updateTask}
                valueProps={item.text}
                item={item} />
            : <>
                {longTouch
                    ? (<div className="task__edit" >
                        <p id="taskEdit" onClick={() => setEdit(true)}>Изменить</p>
                        <p id="taskEdit" onClick={() => deleteTask(item.id)}>Удалить</p>
                    </div>)
                    : ""}
                <label className="info-task__checkbox">
                    {isChecked ? <img src={isSuccess} alt="isSuccess" /> : ""}
                    <input id="checkbox" type="checkbox" checked={isChecked || ""} onChange={(evt) => setCheckedTask(evt)} />
                    <span></span>
                </label>
                <div className="flex"
                    onTouchStart={handleDoubleMenu}>
                    <div className="task__info info-task">
                        {isChecked
                            ? <p className="info-task__text" style={{ textDecoration: "line-through", color: "#EB5757" }}>{item.text}</p>
                            : <p className="info-task__text" >{item.text}</p>}
                        {withEmpty && <Badge text={item.listTitle} color={item.color} />}
                    </div>
                    <div className="task__icons">
                        <img className="icon--edit" src={iconEdit} alt="iconEdit" onClick={() => setEdit(true)} />
                        <img className="icon--delete" src={iconDelete} alt="iconDelete" onClick={() => deleteTask(item.id)} />
                    </div>
                </div>
            </>
        }
    </li >
}
export default Task