import { Link } from "react-router-dom"
import * as userService from "../utilities/users-service"


export default function NavBar(props) {
    const { user, setUser } = props
    function handleLogOut(){
        userService.logOut()
        setUser(null)
    }
   
    return(
        <nav>
            <Link to ='/feed'> Feed</Link>
            &nbsp; | &nbsp;
            <Link to ='/chat'> Chat</Link>
            &nbsp; | &nbsp;
            <Link to='' onClick={handleLogOut}>Log Out</Link>
            <h3>Welcome {user.username}</h3>
        </nav>
    )
}