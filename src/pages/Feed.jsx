import { useState, useEffect } from "react"
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react"

export default function Feed(){

const user = JSON.parse(localStorage.getItem("pixelUser"))

const [posts,setPosts] = useState([])

/* ✅ LOAD POSTS (ONLY FROM STORAGE) */

useEffect(()=>{

const loadPosts = () => {

const stored = JSON.parse(localStorage.getItem("pixelPosts")) || []

const cleaned = stored.map(p => ({
...p,
hearts: p.hearts || [],
showComments: p.showComments || false,
commentInput: p.commentInput || "",
comments: p.comments || []
}))

setPosts(cleaned)
}

loadPosts()

window.addEventListener("storage", loadPosts)
return () => window.removeEventListener("storage", loadPosts)

},[])

/* SAVE POSTS */

const updatePosts = (newPosts) => {

setPosts(newPosts)

localStorage.setItem("pixelPosts", JSON.stringify(newPosts))

const saved = newPosts.filter(p => p.saved)
localStorage.setItem("pixelSaved", JSON.stringify(saved))

window.dispatchEvent(new Event("storage"))
}

/* SAVE */

const handleSave = (post) => {

if(!user){
alert("Please login to save posts")
return
}

const updated = posts.map(p =>
p.id === post.id ? {...p, saved: !p.saved} : p
)

updatePosts(updated)
}

/* LIKE */

const handleLike = (postId) => {

if(!user){
alert("Please login to like posts")
return
}

const updated = posts.map(post=>{

if(post.id !== postId) return post

if(!post.liked){

const hearts = Array.from({length:6}).map((_,i)=>({
id:Date.now()+i,
left:Math.random()*20-10
}))

setTimeout(()=>{
setPosts(prev =>
prev.map(p =>
p.id === postId ? {...p, hearts:[]} : p
))
},900)

return {...post, liked:true, hearts}

}

return {...post, liked:false}

})

updatePosts(updated)
}

/* COMMENTS */

const toggleComments = (postId) => {

if(!user){
alert("Please login to comment")
return
}

updatePosts(
posts.map(post =>
post.id === postId
? {...post, showComments: !post.showComments}
: post
)
)
}

const updateCommentInput = (postId,value) => {

updatePosts(
posts.map(post =>
post.id === postId
? {...post, commentInput:value}
: post
)
)
}

const addComment = (postId) => {

const post = posts.find(p=>p.id === postId)
if(!post.commentInput.trim()) return

updatePosts(
posts.map(p=>{
if(p.id !== postId) return p

return {
...p,
commentInput:"",
comments:[
...p.comments,
{
id:Date.now(),
user:user.name,
text:p.commentInput,
replies:[]
}
]
}
})
)
}

const addReply = (postId,commentId,text) => {

updatePosts(
posts.map(post=>{
if(post.id !== postId) return post

return{
...post,
comments: post.comments.map(comment=>{
if(comment.id !== commentId) return comment
return{
...comment,
replies:[
...comment.replies,
{
id:Date.now(),
user:user.name,
text
}
]
}
})
}
})
)
}

const deleteComment = (postId, commentId) => {

updatePosts(
posts.map(post=>{
if(post.id !== postId) return post
return {
...post,
comments: post.comments.filter(c => c.id !== commentId)
}
})
)
}

return(

<div className="min-h-screen bg-white dark:bg-black text-black dark:text-white overflow-x-hidden">

<h1 className="text-4xl text-center pt-20 font-introducing">
Event Feed
</h1>

<div className="max-w-4xl mx-auto mt-16 space-y-16 px-4">

{/* ✅ EMPTY STATE */}

{posts.length === 0 ? (

<p className="text-center text-gray-500 mt-20">
No posts yet. Upload from Manage Data 📸
</p>

) : (

posts.map(post=>(

<div key={post.id} className="flex flex-col md:flex-row gap-6 items-start">

{/* POST */}

<div className="flex-1 border border-neutral-200 dark:border-neutral-800 p-6 rounded-xl">

<h2 className="font-semibold text-xl mb-2">
{post.title}
</h2>

<p className="opacity-80 mb-4">
{post.text}
</p>

<img src={post.image} className="w-full rounded-lg"/>

{/* ACTION BAR */}

<div className="flex items-center justify-between mt-4">

<div className="flex gap-4">

<button
onClick={()=>handleLike(post.id)}
className={`w-9 h-9 flex items-center justify-center rounded-full
${post.liked ? "text-blue-600" : ""}
`}
>
<Heart size={20} fill={post.liked ? "currentColor" : "none"} />
</button>

<button
onClick={()=>toggleComments(post.id)}
className="w-9 h-9 flex items-center justify-center rounded-full hover:text-blue-600"
>
<MessageCircle size={20}/>
</button>

<button className="w-9 h-9 flex items-center justify-center rounded-full hover:text-blue-600">
<Share2 size={20}/>
</button>

</div>

<button
onClick={()=>handleSave(post)}
className={`w-9 h-9 flex items-center justify-center rounded-full
${post.saved ? "text-blue-600" : ""}
`}
>
<Bookmark size={20} fill={post.saved ? "currentColor" : "none"} />
</button>

</div>

</div>

{/* COMMENTS */}

{post.showComments && (

<div className="w-full md:w-80 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 space-y-4">

<h3 className="font-semibold">Comments</h3>

<div className="space-y-3 max-h-80 overflow-y-auto">

{post.comments.map(comment=>(
<div key={comment.id}>

<p className="text-sm">
<b>{comment.user}</b> {comment.text}
</p>

<div className="flex gap-3 text-xs mt-1">

<button
onClick={()=>{
const reply = prompt("Reply")
if(reply) addReply(post.id,comment.id,reply)
}}
className="opacity-60 hover:opacity-100"
>
Reply
</button>

{user && comment.user === user.name && (
<button
onClick={()=>deleteComment(post.id,comment.id)}
className="text-red-500"
>
Delete
</button>
)}

</div>

<div className="ml-4 text-xs opacity-80 mt-1">

{comment.replies.map(reply=>(
<p key={reply.id}>
<b>{reply.user}</b> {reply.text}
</p>
))}

</div>

</div>
))}

</div>

<div className="flex gap-2">

<input
value={post.commentInput}
onChange={(e)=>updateCommentInput(post.id,e.target.value)}
placeholder="Add comment..."
className="flex-1 text-sm border rounded-lg px-3 py-1
bg-white text-black dark:bg-neutral-900 dark:text-white
border-neutral-300 dark:border-neutral-700"
/>

<button
onClick={()=>addComment(post.id)}
className="text-sm px-3 py-1 border rounded-3xl"
>
Post
</button>

</div>

</div>

)}

</div>

))

)}

</div>

</div>

)

}