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

loadUser()

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

<nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-neutral-200 dark:border-neutral-800 dark:text-white overflow-x-hidden">

<div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">

{/* LOGO */}

<Link to="/" className="font-headersfont text-xl hover:text-blue-600">
Pixel
</Link>

{/* NAV LINKS */}

<div className="flex items-center gap-4 md:gap-6">

<Link to="/" className="hover:text-blue-600 transition text-sm md:text-base">
Home
</Link>

<Link to="/feed" className="hover:text-blue-600 transition text-sm md:text-base">
Feed
</Link>

<Link to="/gallery" className="hover:text-blue-600 transition text-sm md:text-base">
Gallery
</Link>

<Link to="/newsletter" className="hover:text-blue-600 transition text-sm md:text-base">
Newsletter
</Link>

{/* ✅ LOGIN / PROFILE SWITCH */}

{user ? (

/* PROFILE */
<img
src={user.picture}
alt="profile"
onClick={()=>navigate("/profile")}
className={`
w-8 h-8 md:w-9 md:h-9 
rounded-full cursor-pointer object-cover 
ring-2 ring-offset-1 md:ring-offset-2 
ring-offset-white dark:ring-offset-black 
${getRingColor()} 
hover:scale-105 transition
`}
/>

) : (

/* LOGIN BUTTON */
<button
onClick={()=>navigate("/login")}
className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm md:text-base hover:scale-105 transition"
>
Login
</button>

)}

</div>

</div>

</nav>

)

}