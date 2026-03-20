import { useState, useEffect } from "react"

export default function ManageFeed(){

const [image,setImage] = useState(null)
const [title,setTitle] = useState("")
const [caption,setCaption] = useState("")
const [posts,setPosts] = useState([])
const [editingId,setEditingId] = useState(null)

/* LOAD POSTS */

useEffect(()=>{

const loadPosts = () => {
const stored = JSON.parse(localStorage.getItem("pixelPosts")) || []
setPosts(stored)
}

loadPosts()

window.addEventListener("storage", loadPosts)
return ()=>window.removeEventListener("storage", loadPosts)

},[])

/* IMAGE UPLOAD */

const handleImage = (e) => {

const file = e.target.files[0]
if(!file) return

const reader = new FileReader()

reader.onload = () => {
setImage(reader.result)
}

reader.readAsDataURL(file)
}

/* SAVE OR UPDATE POST */

const savePost = () => {

if(!image || !title.trim()){
alert("Image & title required")
return
}

let updated

if(editingId){

/* EDIT MODE */
updated = posts.map(p =>
p.id === editingId
? {
...p,
image,
title,
text: caption // ✅ IMPORTANT
}
: p
)

}else{

/* NEW POST (FULL STRUCTURE FOR FEED) */
const newPost = {
id: Date.now(),
image,
title,
text: caption,

liked: false,
saved: false,
hearts: [],
showComments: false,
commentInput: "",
comments: []
}

updated = [newPost, ...posts]

}

setPosts(updated)
localStorage.setItem("pixelPosts", JSON.stringify(updated))
window.dispatchEvent(new Event("storage"))

/* RESET */
setImage(null)
setTitle("")
setCaption("")
setEditingId(null)

alert(editingId ? "Post updated ✅" : "Post added ✅")
}

/* DELETE */

const deletePost = (id) => {

const updated = posts.filter(p => p.id !== id)

setPosts(updated)
localStorage.setItem("pixelPosts", JSON.stringify(updated))
window.dispatchEvent(new Event("storage"))

}

/* EDIT */

const editPost = (post) => {

setImage(post.image)
setTitle(post.title)
setCaption(post.text || "")
setEditingId(post.id)

window.scrollTo({ top: 0, behavior: "smooth" })
}

return(

<div className="space-y-6 font-buttonsfont">

{/* UPLOAD */}

<input type="file" accept="image/*" onChange={handleImage}/>

{/* PREVIEW */}

{image && (
<img src={image} className="w-40 rounded-lg"/>
)}

<input
value={title}
onChange={(e)=>setTitle(e.target.value)}
placeholder="Title"
className="border px-3 py-2 rounded w-full dark:text-black"
/>

<textarea
value={caption}
onChange={(e)=>setCaption(e.target.value)}
placeholder="Caption"
className="border px-3 py-2 rounded w-full dark:text-black"
/>

<button
onClick={savePost}
className="bg-blue-600 text-white px-4 py-2 rounded-full"
>
{editingId ? "Update Post" : "Upload Post"}
</button>

{/* POSTS */}

<div className="grid grid-cols-2 gap-4">

{posts.length === 0 ? (
<p className="text-gray-500">No posts yet</p>
) : (

posts.map(p=>(
<div key={p.id} className="border p-2 rounded space-y-2">

<img src={p.image} className="rounded"/>

<h3 className="font-bold">{p.title}</h3>
<p className="text-sm">{p.text}</p>

<div className="flex gap-3 text-sm">

<button
onClick={()=>editPost(p)}
className="text-blue-600"
>
Edit
</button>

<button
onClick={()=>deletePost(p.id)}
className="text-red-600"
>
Delete
</button>

</div>

</div>
))

)}

</div>

</div>

)
}