import Feed from "../components/Feed/Feed"
import createPost from "../components/Feed/createPost"
import CreateFeed from "../components/Feed/createFeed"

export default function HomePage({user, setUser}){
    return(
        <div>
            <CreateFeed user={user} setUser={setUser}/>
        </div>
    )
}