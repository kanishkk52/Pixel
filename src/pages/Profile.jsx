import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

export default function Profile(){

const navigate = useNavigate()

const [user,setUser] = useState(null)
const [savedPosts,setSavedPosts] = useState([])

/* LOGOUT */

const handleLogout = () => {

window.localStorage.removeItem("pixelUser")

// trigger navbar update
window.dispatchEvent(new Event("storage"))

navigate("/")

}

/* LOAD USER + SAVED POSTS */

useEffect(()=>{

const storedUser = localStorage.getItem("pixelUser")

if(storedUser){
setUser(JSON.parse(storedUser))
}

const saved = JSON.parse(localStorage.getItem("pixelSaved")) || []
setSavedPosts(saved)

},[])

/* DOMAIN RING COLOR */

const getRingColor = () => {

if(!user) return ""

if(user.domain === "sait.ac.in"){
return "ring-[#b55f22]"
}

if(user.domain === "saip.ac.in"){
return "ring-blue-600"
}

return "ring-neutral-400"

}

if(!user) return <div className="p-10">Not logged in</div>

return(

<div className="min-h-screen pt-24 px-6 bg-white text-black dark:bg-black dark:text-white">

{/* HEADER */}

<div className="flex items-center gap-8">

<img
src={user.picture}
className={`w-28 h-28 rounded-full ring-4 ring-offset-4 ring-offset-white dark:ring-offset-black ${getRingColor()}`}
/>

<div>

<h1 className="text-3xl font-headersfont">{user.name}</h1>

<p className="text-gray-600 dark:text-gray-400 font-buttonsfont">
{user.email}
</p>

<button
onClick={handleLogout}
className="mt-6 px-6 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition text-red-600"
>
Logout
</button>

<div className="flex gap-6 mt-4 text-sm text-gray-700 dark:text-gray-300">

<span><b>{savedPosts.length}</b> Saves</span>
<span><b>0</b> Followers</span>
<span><b>0</b> Following</span>

</div>

</div>

</div>

{/* SAVED SECTION */}

<div className="mt-14">

<h2 className="text-xl mb-6 text-gray-800 dark:text-gray-200">
Saved
</h2>

{/* SAVED GRID */}

{savedPosts.length === 0 ? (

<p className="text-gray-500 dark:text-gray-400">
No saved posts yet.
</p>

) : (

<div className="grid grid-cols-3 gap-4">

{savedPosts.map(post => (

<img
key={post.id}
src={post.image}
className="h-40 w-full object-cover rounded-xl hover:scale-[1.02] transition"
/>

))}

</div>

)}

</div>

</div>

)

}