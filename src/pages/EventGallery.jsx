import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import ImageViewer from "./ImageViewer"

export default function EventGallery(){

const user = JSON.parse(localStorage.getItem("pixelUser"))
const navigate = useNavigate()
const { id } = useParams()

/* DEFAULT IMAGES */

const defaultEvents = {
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

/* ✅ STATE (IMPORTANT FIX) */

const [images,setImages] = useState([])
const [viewer,setViewer] = useState(null)

/* ✅ LOAD + LISTEN */

useEffect(() => {

const loadImages = () => {

const stored = JSON.parse(localStorage.getItem("eventImages")) || {}

const merged = [
...(stored[id] || []),
...(defaultEvents[id] || [])
]

setImages(merged)
}

loadImages()

window.addEventListener("storage", loadImages)
return () => window.removeEventListener("storage", loadImages)

}, [id])

/* FIND MY PHOTOS */

const handleFindMyPhotos = () => {

if(!user){
alert("Login required")
return
}

const faceData = localStorage.getItem("faceData")

if(!faceData){
alert("Please set up your face first")
navigate("/face-setup")
return
}

navigate(`/face-filter/${id}`)
}

return(

<div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">

{/* HEADER */}

<div className="max-w-6xl mx-auto px-6 pt-24 flex justify-between items-center">

<h1 className="text-2xl font-headersfont">
Event Photos
</h1>

{user && (
<button
onClick={handleFindMyPhotos}
className="px-4 py-2 rounded-3xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition font-buttonsfont"
>
Find My Photos
</button>
)}

</div>

{/* IMAGES */}

<div className="max-w-6xl mx-auto px-6 mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

{images.length === 0 ? (
<p className="text-gray-500 col-span-full text-center">
No images uploaded yet.
</p>
) : (

images.map((img,i)=>(

<div key={i} className="relative group cursor-pointer">

<img
src={img}
onClick={()=> user && setViewer(i)}
className={`rounded-lg cursor-pointer
${!user ? "blur-sm brightness-75" : ""}
`}
/>

{/* LOGIN OVERLAY */}

{!user && (
<div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
<p className="text-white text-sm font-buttonsfont">
Login to View
</p>
</div>
)}

{/* DOWNLOAD */}

{user && (
<button
onClick={()=>{
fetch(img)
.then(res => res.blob())
.then(blob => {

const url = window.URL.createObjectURL(blob)

const a = document.createElement("a")
a.href = url
a.download = "photo.png"
document.body.appendChild(a)
a.click()
a.remove()

window.URL.revokeObjectURL(url)

})
}}
className="
absolute top-2 right-2
bg-black/70 text-white text-xs px-3 py-1
rounded-3xl
opacity-100 md:opacity-0 md:group-hover:opacity-100
transition
"
>
Download
</button>
)}

</div>

))

)}

</div>

{/* VIEWER */}

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