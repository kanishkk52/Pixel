import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Navbar(){

const [user,setUser] = useState(null)
const navigate = useNavigate()

/* LOAD USER */

useEffect(()=>{

const loadUser = () => {

const storedUser = window.localStorage.getItem("pixelUser")

if(storedUser){
setUser(JSON.parse(storedUser))
}else{
setUser(null)
}

}

/* run immediately */
loadUser()

/* listen for changes */
window.addEventListener("storage", loadUser)
window.addEventListener("userChanged", loadUser)

return ()=>{
window.removeEventListener("storage", loadUser)
window.removeEventListener("userChanged", loadUser)
}

},[])

/* LOGOUT */

const handleLogout = () => {

window.localStorage.removeItem("pixelUser")

/* trigger updates everywhere */
window.dispatchEvent(new Event("storage"))
window.dispatchEvent(new Event("userChanged"))

navigate("/")

}

/* RING COLOR */

const getRingColor = () => {

if(!user) return ""

if(user.domain === "sait.ac.in") return "ring-[#b55f22]"
if(user.domain === "saip.ac.in") return "ring-blue-600"

return "ring-neutral-400"

}

return(

<nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-neutral-200 dark:border-neutral-800 dark:text-white">

<div className="max-w-7xl mx-auto flex justify-between items-center p-4">

{/* LOGO */}

<Link to="/" className="font-headersfont text-xl">
Pixel
</Link>

{/* NAV LINKS */}

<div className="flex items-center gap-6">

<Link to="/" className="hover:text-blue-600 transition">
Home
</Link>

<Link to="/feed" className="hover:text-blue-600 transition">
Feed
</Link>

<Link to="/gallery" className="hover:text-blue-600 transition">
Gallery
</Link>

<Link to="/newsletter" className="hover:text-blue-600 transition">
Newsletter
</Link>

{/* PROFILE */}

{user && (

<img
src={user.picture}
alt="profile"
onClick={()=>navigate("/profile")}
className={`w-9 h-9 rounded-full cursor-pointer object-cover ring-2 ring-offset-2 ring-offset-white dark:ring-offset-black ${getRingColor()} hover:scale-105 transition`}
/>

)}

</div>

</div>

</nav>

)

}