import Cookies from "js-cookie"
import {Navigate} from "react-router-dom"

const Logout=()=>{
    Cookies.remove("jwt_token")
    return(
        <Navigate to="/login" replace/>
    )
}

export default Logout