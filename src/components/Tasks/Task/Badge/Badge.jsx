import "./badge.css"

const Badge = ({ text, color }) => {
    return <div className="info-task__badge row" style={{ backgroundColor: color }}>
        <p className="badge__text">{text}</p>
    </div>
}

export default Badge