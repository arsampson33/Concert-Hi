import LogInForm from "../components/LogInForm/LogInForm"
import SignUpForm from "../components/SignUpForm/SignUpForm"
import { useState } from "react"


export default function AuthPage ({setUser}){

const [showSignUp, setShowSignUp] = useState(false)

    return(
        <div>
            <h1 style={{fontFamily:"Chubiy", marginTop:"1em"}}>Concert Hi</h1>
          { showSignUp ? <SignUpForm setUser={setUser}/> :
            <LogInForm setUser={setUser} />}

            <button onClick={() => setShowSignUp(!showSignUp)}> {!showSignUp ? "Create an Account" : "Already Have an Account"}</button>
        </div>
    )

}