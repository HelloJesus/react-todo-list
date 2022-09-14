import { useState } from "react"
import isSuccess from "../../images/isSuccess.png"

const InputEdit = (props) => {
    const { setUpdateValue, valueProps, item } = props

    let [value, setValue] = useState(valueProps)

    return <>
        <input type="text" value={value} autoFocus={true}
            onChange={(e) => setValue(e.target.value)} onBlur={() => setUpdateValue(value, item.id, item.isCompleted)} />
        <img className="icon--edit" src={isSuccess} alt="iconEdit" onClick={() => setUpdateValue(true)} />
    </>
}

export default InputEdit