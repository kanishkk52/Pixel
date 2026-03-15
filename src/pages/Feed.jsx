import { useState, useEffect } from "react"
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react"

export default function Feed(){

const user = JSON.parse(localStorage.getItem("pixelUser"))

const initialPosts = [
{
id:1,
title:"Photography Club Meetup",
text:"Amazing moments from today's meetup.",
image:"https://res.cloudinary.com/dwk329jcv/image/upload/v1773512354/photo6_p5lng5.jpg",
liked:false,
saved:false,
hearts:[],
showComments:false,
comments:[
{ id:1, user:"Aarav", text:"Great event!", replies:[] },
{ id:2, user:"Riya", text:"Wish I was there!", replies:[] }
]
},
{
id:2,
title:"Photography Club Meetup",
text:"Amazing moments from today's meetup.",
image:"https://res.cloudinary.com/dwk329jcv/image/upload/v1773512346/photo10_m1fzw9.jpg",
liked:false,
saved:false,
hearts:[],
showComments:false,
comments:[]
},
{
id:3,
title:"Photography Club Meetup",
text:"Amazing moments from today's meetup.",
image:"https://res.cloudinary.com/dwk329jcv/image/upload/v1773512341/photo5_cdywlo.jpg",
liked:false,
saved:false,
hearts:[],
showComments:false,
comments:[]
}
]

const [posts,setPosts] = useState([])

const [newComment,setNewComment] = useState("")

/* SYNC SAVED POSTS ON LOAD */

useEffect(()=>{

const savedPosts = JSON.parse(localStorage.getItem("pixelSaved")) || []

const syncedPosts = initialPosts.map(post => ({
...post,
saved: savedPosts.some(saved => saved.id === post.id)
}))

setPosts(syncedPosts)

},[])

/* SAVE */

const handleSave = (post) => {

if(!user){
alert("Please login to save posts")
return
}

setPosts(prevPosts => prevPosts.map(p => {

if(p.id !== post.id) return p

const newSaved = !p.saved

let savedPosts = JSON.parse(localStorage.getItem("pixelSaved")) || []

if(newSaved){

// prevent duplicates
if(!savedPosts.some(sp => sp.id === post.id)){
savedPosts.push(post)
}

}else{

savedPosts = savedPosts.filter(sp => sp.id !== post.id)

}

localStorage.setItem("pixelSaved", JSON.stringify(savedPosts))

return {...p, saved:newSaved}

}))

}

/* LIKE */

const handleLike = (postId) => {

if(!user){
alert("Please login to like posts")
return
}

setPosts(posts.map(post=>{

if(post.id !== postId) return post

if(!post.liked){

const newHearts = Array.from({length:6}).map((_,i)=>({
id:Date.now()+i,
left:Math.random()*20-10
}))

setTimeout(()=>{
setPosts(prev =>
prev.map(p =>
p.id === postId ? {...p,hearts:[]} : p
))
},900)

return {...post, liked:true, hearts:newHearts}

}

return {...post, liked:false}

}))
}

/* TOGGLE COMMENTS */

const toggleComments = (postId) => {

if(!user){
alert("Please login to comment")
return
}

setPosts(posts.map(post =>
post.id === postId
? {...post, showComments:!post.showComments}
: post
))

}

/* ADD COMMENT */

const addComment = (postId) => {

if(!user){
alert("Please login to comment")
return
}

if(!newComment.trim()) return

setPosts(posts.map(post=>{

if(post.id !== postId) return post

return {
...post,
comments:[
...post.comments,
{
id:Date.now(),
user:user.name,
text:newComment,
replies:[]
}
]
}

}))

setNewComment("")
}

/* ADD REPLY */

const addReply = (postId,commentId,text) => {

if(!user){
alert("Please login to reply")
return
}

setPosts(posts.map(post=>{

if(post.id !== postId) return post

return {
...post,
comments:post.comments.map(comment=>{

if(comment.id !== commentId) return comment

return {
...comment,
replies:[
...comment.replies,
{
id:Date.now(),
user:user.name,
text:text
}
]
}

})

}

}))

}

return(

<div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">

<h1 className="text-4xl font-introducing text-center pt-20">
Event Feed
</h1>

<div className="max-w-4xl mx-auto mt-16 space-y-16">

{posts.map(post=>(

<div key={post.id} className="flex gap-6">

<div className="flex-1 border border-neutral-200 dark:border-neutral-800 p-6 rounded-xl">

<h2 className="font-semibold text-xl mb-2">
{post.title}
</h2>

<p className="opacity-80 mb-4">
{post.text}
</p>

<img src={post.image} className="rounded-lg"/>

<div className="flex items-center justify-between mt-4">

<div className="flex items-center gap-4">

{/* LIKE */}

<div className="relative">

<button
onClick={()=>handleLike(post.id)}
className={`w-9 h-9 flex items-center justify-center rounded-full transition hover:scale-110
${post.liked ? "text-blue-600" : "hover:text-blue-600"}
`}
>

<Heart
size={20}
strokeWidth={1.5}
fill={post.liked ? "currentColor" : "none"}
/>

</button>

{post.hearts.map(h=>(
<span
key={h.id}
className="absolute left-1/2 top-1/2 text-blue-600 pointer-events-none animate-floatHeart"
style={{transform:`translate(-50%,-50%) translateX(${h.left}px)`}}
>
<Heart size={12} fill="currentColor"/>
</span>
))}

</div>

{/* COMMENT */}

<button
onClick={()=>toggleComments(post.id)}
className="w-9 h-9 flex items-center justify-center rounded-full hover:scale-110 hover:text-blue-600 transition"
>
<MessageCircle size={20}/>
</button>

{/* SHARE */}

<button className="w-9 h-9 flex items-center justify-center rounded-full hover:scale-110 hover:text-blue-600 transition">
<Share2 size={20}/>
</button>

</div>

{/* SAVE */}

<button
onClick={()=>handleSave(post)}
className={`w-9 h-9 flex items-center justify-center rounded-full transition hover:scale-110
${post.saved ? "text-blue-600" : "hover:text-blue-600"}
`}
>

<Bookmark
size={20}
strokeWidth={1.5}
fill={post.saved ? "currentColor" : "none"}
/>

</button>

</div>

</div>

</div>

))}

</div>

</div>

)

}