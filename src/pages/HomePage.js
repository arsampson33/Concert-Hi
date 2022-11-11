import Feed from "../components/Feed/Feed"
import createPost from "../components/Feed/createPost"


export default function HomePage({user, setUser}){
    return(
        <div>
            <Feed user={user} setUser={setUser}/>
        </div>
    )
}