import Feed from "../components/Feed/Feed"


export default function HomePage({user, setUser}){
    return(
        <div>
            <Feed user={user} setUser={setUser}/>
        </div>
    )
}