import { useLocation } from "react-router-dom"
import "./pageNotFound.css"

const PageNotFound = () => {
    let { pathname } = useLocation()
    return <div className="page-undefined">
        <p>{pathname}</p>
        <h3>Page Not Found</h3>
    </div>
}

export default PageNotFound