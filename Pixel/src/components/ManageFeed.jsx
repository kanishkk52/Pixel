import { useState, useEffect } from "react"

export default function ManageFeed(){

const [image,setImage] = useState(null)
const [title,setTitle] = useState("")
const [caption,setCaption] = useState("")
const [posts,setPosts] = useState([])
<<<<<<< HEAD:Pixel/src/components/ManageFeed.jsx

/* LOAD POSTS */

const loadPosts = async () => {
const res = await fetch("http://localhost:8000/api/posts/")
const data = await res.json()
setPosts(data)
}

useEffect(()=>{
loadPosts()
},[])

/* IMAGE */

const handleImage = (e)=>{
setImage(e.target.files[0])
}

/* SAVE */

const savePost = async () => {

if(!image || !title){
=======
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
>>>>>>> 8a44c1314bc00e3dc2c0691aa836cf75a52cb3a8:src/components/ManageFeed.jsx
alert("Image & title required")
return
}

<<<<<<< HEAD:Pixel/src/components/ManageFeed.jsx
const formData = new FormData()
formData.append("image", image)
formData.append("title", title)
formData.append("caption", caption)

await fetch("http://localhost:8000/api/posts/",{
method:"POST",
body:formData
})

alert("Post uploaded ✅")

setImage(null)
setTitle("")
setCaption("")

loadPosts()
=======
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
>>>>>>> 8a44c1314bc00e3dc2c0691aa836cf75a52cb3a8:src/components/ManageFeed.jsx
}

/* DELETE */

<<<<<<< HEAD:Pixel/src/components/ManageFeed.jsx
const deletePost = async (id)=>{
await fetch(`http://localhost:8000/api/posts/${id}/`,{
method:"DELETE"
})
loadPosts()
=======
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
>>>>>>> 8a44c1314bc00e3dc2c0691aa836cf75a52cb3a8:src/components/ManageFeed.jsx
}

return(

<<<<<<< HEAD:Pixel/src/components/ManageFeed.jsx
<div className="space-y-6">

<input type="file" onChange={handleImage}/>
=======
<div className="space-y-6 font-buttonsfont">

{/* UPLOAD */}

<input type="file" accept="image/*" onChange={handleImage}/>

{/* PREVIEW */}

{image && (
<img src={image} className="w-40 rounded-lg"/>
)}
>>>>>>> 8a44c1314bc00e3dc2c0691aa836cf75a52cb3a8:src/components/ManageFeed.jsx

<input
value={title}
onChange={(e)=>setTitle(e.target.value)}
placeholder="Title"
<<<<<<< HEAD:Pixel/src/components/ManageFeed.jsx
className="border px-3 py-2 w-full"
=======
className="border px-3 py-2 rounded w-full dark:text-black"
>>>>>>> 8a44c1314bc00e3dc2c0691aa836cf75a52cb3a8:src/components/ManageFeed.jsx
/>

<textarea
value={caption}
onChange={(e)=>setCaption(e.target.value)}
placeholder="Caption"
<<<<<<< HEAD:Pixel/src/components/ManageFeed.jsx
className="border px-3 py-2 w-full"
/>

<button onClick={savePost} className="bg-blue-600 text-white px-4 py-2 rounded">
Upload Post
</button>

<div className="grid grid-cols-2 gap-4">

{posts.map(p=>(
<div key={p._id}>

<img src={p.image_url} />
<h3>{p.title}</h3>

<button onClick={()=>deletePost(p._id)}>Delete</button>

</div>
))}
=======
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
>>>>>>> 8a44c1314bc00e3dc2c0691aa836cf75a52cb3a8:src/components/ManageFeed.jsx

</div>

</div>

)
}