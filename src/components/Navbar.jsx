import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Navbar(){

const [user,setUser] = useState(null)
const [open,setOpen] = useState(false)
const navigate = useNavigate()

useEffect(()=>{

const loadUser = () => {

const storedUser = window.localStorage.getItem("pixelUser")

if(storedUser){
  setUser(JSON.parse(storedUser))
}else{
  setUser(null)
}

}

loadUser()

window.addEventListener("storage", loadUser)

return ()=>{
window.removeEventListener("storage", loadUser)
}

},[])

const handleLogout = () => {

window.localStorage.removeItem("pixelUser")
window.dispatchEvent(new Event("storage"))

navigate("/")

}

/* ring color */

const getRingColor = () => {

if(!user) return ""

if(user.domain === "sait.ac.in") return "ring-[#b55f22]"
if(user.domain === "saip.ac.in") return "ring-blue-600"

return "ring-neutral-400"

}

return(

<nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-neutral-200 dark:border-neutral-800 dark:text-white">

<div className="max-w-7xl mx-auto flex justify-between items-center p-4">

<Link to="/" className="font-headersfont text-xl">
Pixel
</Link>

<div className="flex items-center gap-6">

<Link to="/">Home</Link>
<Link to="/feed">Feed</Link>
<Link to="/newsletter">Newsletter</Link>

{/* PROFILE */}

{user && (

<div
className="relative flex items-center"
onMouseEnter={()=>setOpen(true)}
onMouseLeave={()=>setOpen(false)}
>

{/* PROFILE IMAGE */}

<img
src={user.picture + "?sz=200"}
alt="profile"
onClick={()=>navigate("/profile")}
className={`w-9 h-9 rounded-full cursor-pointer ring-2 ring-offset-2 ring-offset-white dark:ring-offset-black ${getRingColor()} hover:scale-105 transition`}
/>



</div>

)}

</div>

</div>

</nav>

)

}