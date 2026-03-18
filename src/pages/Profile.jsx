import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Pencil } from "lucide-react"
import ImageViewer from "./ImageViewer"

export default function Profile(){

const navigate = useNavigate()

const [user,setUser] = useState(null)
const [savedPosts,setSavedPosts] = useState([])
const [savedImages,setSavedImages] = useState([])

const [viewer,setViewer] = useState(null)
const [postViewer,setPostViewer] = useState(null)

/* EDIT STATES */

const [editing,setEditing] = useState(false)
const [newName,setNewName] = useState("")
const [newPhoto,setNewPhoto] = useState("")

/* LOGOUT */

const handleLogout = () => {
window.localStorage.removeItem("pixelUser")
window.dispatchEvent(new Event("storage"))
navigate("/")
}

/* LOAD DATA */

useEffect(()=>{

const loadData = () => {

const storedUser = localStorage.getItem("pixelUser")

if(storedUser){
const parsed = JSON.parse(storedUser)
setUser(parsed)
setNewName(parsed.name)
setNewPhoto(parsed.picture)
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

/* IMAGE UPLOAD */

const handleImageUpload = (e) => {

const file = e.target.files[0]
if(!file) return

/* only images */
if(!file.type.startsWith("image/")){
alert("Please upload an image file")
return
}

const reader = new FileReader()

reader.onload = () => {

const img = new Image()

img.onload = () => {

const size = Math.min(img.width, img.height)

const canvas = document.createElement("canvas")
canvas.width = size
canvas.height = size

const ctx = canvas.getContext("2d")

ctx.drawImage(
img,
(img.width - size)/2,
(img.height - size)/2,
size,
size,
0,
0,
size,
size
)

const cropped = canvas.toDataURL("image/png")

/* IMPORTANT: force update */
setNewPhoto(cropped)

}

img.src = reader.result

}

reader.readAsDataURL(file)

}

/* SAVE PROFILE */

const saveProfile = () => {

if(!newName.trim()){
alert("Username cannot be empty")
return
}

if(!newPhoto){
alert("Profile image not loaded yet")
return
}

const updatedUser = {
...user,
name: newName,
picture: newPhoto
}

/* SAVE */
localStorage.setItem("pixelUser", JSON.stringify(updatedUser))

/* FORCE UPDATE EVERYWHERE */
window.dispatchEvent(new Event("storage"))
window.dispatchEvent(new Event("userChanged"))

/* UPDATE LOCAL STATE */
setUser(updatedUser)
setEditing(false)

}

/* RING COLOR */

const getRingColor = () => {
if(!user) return ""
if(user.domain === "sait.ac.in") return "ring-[#b55f22]"
if(user.domain === "saip.ac.in") return "ring-blue-600"
return "ring-neutral-400"
}

if(!user) return <div className="p-10">Not logged in</div>

return(

<div className="min-h-screen pt-24 bg-white dark:bg-black text-black dark:text-white overflow-x-hidden">

<div className="max-w-5xl mx-auto px-4 sm:px-6">

{/* HEADER */}

<div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">

{/* PROFILE IMAGE */}

<div className="flex flex-col items-center gap-3">

<img
src={newPhoto || user.picture}
className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-offset-4 ring-offset-white dark:ring-offset-black ${getRingColor()}`}
/>

{editing && (
<input
type="file"
accept="image/*"
onChange={handleImageUpload}
className="text-xs"
/>
)}

</div>

{/* USER INFO */}

<div className="text-center sm:text-left">

{/* USERNAME + MODERN ICON */}

<div className="flex items-center gap-3 justify-center sm:justify-start">

{editing ? (

<input
value={newName}
onChange={(e)=>setNewName(e.target.value)}
className="text-2xl sm:text-3xl font-headersfont px-3 py-1 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
/>

) : (

<>
<h1 className="text-2xl sm:text-3xl font-headersfont">
{user.name}
</h1>

<button
onClick={()=>setEditing(true)}
className="
flex items-center justify-center
w-8 h-8
rounded-full
hover:bg-neutral-200 dark:hover:bg-neutral-800
transition
"
>
<Pencil size={16} className="text-gray-500 hover:text-blue-600"/>
</button>
</>

)}

</div>

<p className="text-gray-600 dark:text-gray-400 text-sm">
{user.email}
</p>

{/* ACTION BUTTONS */}

<div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">

{editing && (

<>
<button
onClick={saveProfile}
className="px-5 py-2 rounded-xl bg-blue-600 text-white"
>
Save
</button>

<button
onClick={()=>setEditing(false)}
className="px-5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700"
>
Cancel
</button>
</>

)}

<button
onClick={handleLogout}
className="px-5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 text-red-600"
>
Logout
</button>

</div>

{/* STATS */}

<div className="flex gap-6 mt-4 text-sm text-gray-700 dark:text-gray-300 justify-center sm:justify-start">

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
<p className="text-gray-500">No saved images yet.</p>
) : (
<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
{savedImages.map((img,i)=>(
<img
key={i}
src={img}
onClick={()=>setViewer(i)}
className="h-40 w-full object-cover rounded-xl cursor-pointer"
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
<p className="text-gray-500">No saved posts yet.</p>
) : (
<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
{savedPosts.map((post,i)=>(
<img
key={post.id}
src={post.image}
onClick={()=>setPostViewer(i)}
className="h-40 w-full object-cover rounded-xl cursor-pointer"
/>
))}
</div>
)}

</div>

{/* VIEWERS */}

{viewer !== null && (
<ImageViewer
images={savedImages}
index={viewer}
setViewer={setViewer}
/>
)}

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