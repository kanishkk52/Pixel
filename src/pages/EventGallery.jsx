import { useParams } from "react-router-dom"
import { useState } from "react"
import ImageViewer from "./ImageViewer"

export default function EventGallery(){

const user = JSON.parse(localStorage.getItem("pixelUser"))

const { id } = useParams()

const events = {

1:[
"https://res.cloudinary.com/dwk329jcv/image/upload/v1773512354/photo6_p5lng5.jpg",
"https://res.cloudinary.com/dwk329jcv/image/upload/v1773512346/photo10_m1fzw9.jpg",
"https://res.cloudinary.com/dwk329jcv/image/upload/v1773512341/photo5_cdywlo.jpg"
],

2:[
"https://res.cloudinary.com/dwk329jcv/image/upload/v1773512346/photo10_m1fzw9.jpg",
"https://res.cloudinary.com/dwk329jcv/image/upload/v1773512341/photo5_cdywlo.jpg"
]

}

const images = events[id] || []

const [viewer,setViewer] = useState(null)

return(

<div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">

<div className="max-w-6xl mx-auto px-8 pt-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

{images.map((img,i)=>(

<div key={i} className="relative group">

<img
src={img}
onClick={()=> user && setViewer(i)}
className={`rounded-lg cursor-pointer
${!user ? "blur-sm brightness-75" : ""}
`}
/>

{!user && (
<div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
<p className="text-white text-sm">Login to View</p>
</div>
)}

{user && (
<a
href={img.replace("/upload/","/upload/fl_attachment/")}
className="absolute top-2 right-2 bg-black/60 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition"
>
Download
</a>
)}

</div>

))}

</div>

{viewer !== null && (

<ImageViewer
images={images}
index={viewer}
setViewer={setViewer}
/>

)}

</div>

)

}