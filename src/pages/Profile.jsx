import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ImageViewer from "./ImageViewer"

export default function Profile(){

const navigate = useNavigate()

const [user,setUser] = useState(null)
const [savedPosts,setSavedPosts] = useState([])
const [savedImages,setSavedImages] = useState([])

const [viewer,setViewer] = useState(null)
const [postViewer,setPostViewer] = useState(null)

/* LOGOUT */

const handleLogout = () => {

window.localStorage.removeItem("pixelUser")
window.dispatchEvent(new Event("storage"))

navigate("/")

}

/* LOAD USER + SAVED DATA */

useEffect(()=>{

const loadData = () => {

const storedUser = localStorage.getItem("pixelUser")

if(storedUser){
setUser(JSON.parse(storedUser))
}

const saved = JSON.parse(localStorage.getItem("pixelSaved")) || []

const posts = saved.filter(item => item.type !== "image")

const images = saved
.filter(item => item.type === "image")
.map(item => item.image)

setSavedPosts(posts)
setSavedImages(images)

}

loadData()

window.addEventListener("storage",loadData)

return ()=>window.removeEventListener("storage",loadData)

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

<div className="min-h-screen bg-white dark:bg-black text-black dark:text-white overflow-x-hidden">

<div className="pt-24 px-4 md:px-6 max-w-6xl mx-auto">

{/* HEADER */}

<div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">

<img
src={user.picture}
className={`w-24 h-24 md:w-28 md:h-28 rounded-full ring-4 ring-offset-4 ring-offset-white dark:ring-offset-black ${getRingColor()}`}
/>

<div className="text-center md:text-left">

<h1 className="text-2xl md:text-3xl font-headersfont">
{user.name}
</h1>

<p className="text-gray-600 dark:text-gray-400 font-buttonsfont">
{user.email}
</p>

<button
onClick={handleLogout}
className="mt-5 px-6 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition text-red-600"
>
Logout
</button>

<div className="flex justify-center md:justify-start gap-6 mt-4 text-sm text-gray-700 dark:text-gray-300">

<span><b>{savedPosts.length + savedImages.length}</b> Saves</span>
<span><b>0</b> Followers</span>
<span><b>0</b> Following</span>

</div>

</div>

</div>

{/* SAVED PHOTOS */}

<div className="mt-14">

<h2 className="text-xl mb-6 text-gray-800 dark:text-gray-200">
Saved Photos
</h2>

{savedImages.length === 0 ? (

<p className="text-gray-500 dark:text-gray-400">
No saved images yet.
</p>

) : (

<div className="grid grid-cols-2 md:grid-cols-3 gap-4">

{savedImages.map((img,i)=>(

<img
key={i}
src={img}
onClick={()=>setViewer(i)}
className="h-36 md:h-40 w-full object-cover rounded-xl cursor-pointer hover:scale-[1.02] transition"
/>

))}

</div>

)}

</div>

{/* SAVED POSTS */}

<div className="mt-16">

<h2 className="text-xl mb-6 text-gray-800 dark:text-gray-200">
Saved Posts
</h2>

{savedPosts.length === 0 ? (

<p className="text-gray-500 dark:text-gray-400">
No saved posts yet.
</p>

) : (

<div className="grid grid-cols-2 md:grid-cols-3 gap-4">

{savedPosts.map((post,i)=>(

<img
key={post.id}
src={post.image}
onClick={()=>setPostViewer(i)}
className="h-36 md:h-40 w-full object-cover rounded-xl cursor-pointer hover:scale-[1.02] transition"
/>

))}

</div>

)}

</div>

{/* IMAGE VIEWER FOR GALLERY PHOTOS */}

{viewer !== null && (

<ImageViewer
images={savedImages}
index={viewer}
setViewer={setViewer}
/>

)}

{/* IMAGE VIEWER FOR FEED POSTS */}

{postViewer !== null && (

<ImageViewer
images={savedPosts.map(p => p.image)}
index={postViewer}
setViewer={setPostViewer}
/>

)}

</div>
</div>
)

}