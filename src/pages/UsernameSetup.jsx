import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function UsernameSetup(){

const [username,setUsername] = useState("")
const navigate = useNavigate()

const user = JSON.parse(localStorage.getItem("pixelUser"))

/* SAVE USERNAME */

const handleContinue = () => {

if(!username.trim()){
alert("Please enter a username")
return
}

/* update user */
const updatedUser = {
...user,
name: username
}

localStorage.setItem("pixelUser", JSON.stringify(updatedUser))

/* notify app */
window.dispatchEvent(new Event("userChanged"))

/* go to face setup */
navigate("/face-setup")
}

return(

<div className="min-h-screen flex items-center justify-center px-6 bg-white dark:bg-black text-black dark:text-white">

<div className="w-full max-w-md space-y-6">

<h1 className="text-3xl text-center">
Choose your username
</h1>

<p className="text-center text-gray-500">
This will be visible on your profile
</p>

<input
type="text"
placeholder="Enter username..."
value={username}
onChange={(e)=>setUsername(e.target.value)}
className="
w-full
px-5 py-3
rounded-full
bg-white/40 dark:bg-white/10
backdrop-blur-md
border border-gray-300 dark:border-white/20
text-black dark:text-white
placeholder-gray-600 dark:placeholder-gray-300
focus:outline-none focus:ring-2 focus:ring-blue-500
"
/>

<button
onClick={handleContinue}
className="w-full py-3 rounded-full bg-blue-600 text-white hover:scale-105 transition"
>
Continue
</button>

</div>

</div>

)

}