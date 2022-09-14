import { useEffect, useState } from "react"
import "./addList.css"
import imgClose from "../../../images/icons8-cancel.svg"
import { API } from "../../../api/api"


const AddList = ({ lists, colors, setAddList, scrollToRef }) => {
    let [visibleBtn, setVisibleBtn] = useState(false)
    let [activeColor, setActiveColor] = useState(null)
    let [inputValue, setInputValue] = useState('')
    let [loading, setLoading] = useState(false)

    useEffect(() => {
        if (colors) {
            setActiveColor(colors[0].id)
        }
    }, [lists, colors])

    const onCkeckInput = (e) => {
        setInputValue(e)
    }

    const onClose = () => {
        setInputValue('')
        setActiveColor('')
        setVisibleBtn(false)
    }

    const addList = () => {
        setLoading(true)

        API.addList(inputValue, activeColor)
            .then(({ data }) => {
                const color = colors.filter(c => c.id === activeColor)[0]
                setAddList({ ...data, tasks: [], color })
                onClose()
            }).catch(() => {
                alert('Ошибка при добавлении списка!')
            }).finally(() => {
                setLoading(false)
                //Оборачиваем наш автоматический скролл setTimeout для того,
                //чтобы данные успели изменится
                setTimeout(() => { scrollToRef() })
            })
    }

    return <div className="btn-container">
        {!visibleBtn ?
            (<div className="btn-newList" onClick={() => setVisibleBtn(true)}>
                + New category
            </div>) :
            (<div className="btn-addList">
                <img src={imgClose} onClick={() => setVisibleBtn(false)} alt="Close" />
                <input type="text" value={inputValue} onChange={(e) => onCkeckInput(e.target.value)} />
                {colors && colors.map((item, index) =>
                    <svg key={index} onClick={() => setActiveColor(item.id)} height="30" width="30">
                        <circle stroke={item.id === activeColor ? item.hex + '90' : ''} cx="15" cy="15" r="10" strokeWidth="5" fill={item.hex} />
                    </svg>)}

                <button onClick={() => addList()} disabled={!inputValue}>
                    {!loading ? 'Добавить' : 'Добавление...'}
                </button>
            </div>)
        }
    </div >
}

export default AddList