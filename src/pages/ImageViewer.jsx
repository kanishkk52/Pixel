import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Download, Bookmark } from "lucide-react"

export default function ImageViewer({ images, index, setViewer }) {

const user = JSON.parse(localStorage.getItem("pixelUser"))
const image = images[index]

const [saved,setSaved] = useState(false)

/* LOAD SAVED */

useEffect(()=>{

let savedPosts = JSON.parse(localStorage.getItem("pixelSaved")) || []
setSaved(savedPosts.some(p => p.image === image))

},[image])

/* KEYBOARD NAVIGATION */

useEffect(()=>{

const handleKey = (e)=>{

if(e.key === "ArrowRight"){
setViewer((prev)=>(prev + 1) % images.length)
}

if(e.key === "ArrowLeft"){
setViewer((prev)=>(prev - 1 + images.length) % images.length)
}

if(e.key === "Escape"){
setViewer(null)
}

}

window.addEventListener("keydown",handleKey)
return ()=>window.removeEventListener("keydown",handleKey)

},[images,setViewer])

/* NAVIGATION */

const nextImage = ()=> setViewer((index + 1) % images.length)
const prevImage = ()=> setViewer((index - 1 + images.length) % images.length)

/* BOOKMARK */

const toggleSave = ()=>{

if(!user){
alert("Login to bookmark images")
return
}

let savedPosts = JSON.parse(localStorage.getItem("pixelSaved")) || []

const existing = savedPosts.find(p => p.image === image)

if(existing){

savedPosts = savedPosts.filter(p => p.image !== image)
setSaved(false)

}else{

savedPosts.push({
id: Date.now(),
type: "image",
image: image
})

setSaved(true)

}

localStorage.setItem("pixelSaved", JSON.stringify(savedPosts))

}

/* DOWNLOAD */

const downloadLink = image.replace("/upload/","/upload/fl_attachment/")

return(

<div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">

{/* IMAGE + ISLAND GROUP */}

<div className="relative group flex flex-col items-center">

{/* IMAGE */}

<img
src={image}
className="max-h-[85vh] max-w-[90vw] rounded-xl"
/>

{/* MOBILE ACTION BAR */}

<div className="flex md:hidden justify-center gap-6 mt-5">

<a
href={downloadLink}
className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg"
>
<Download size={18}/>
<span>Download</span>
</a>

<button
onClick={toggleSave}
className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
saved ? "bg-blue-600 text-white" : "bg-black text-white"
}`}
>
<Bookmark size={18}/>
<span>Save</span>
</button>

</div>

{/* DYNAMIC ISLAND (DESKTOP ONLY) */}

<div
className="
hidden md:flex
absolute top-10 left-1/2 -translate-x-1/2
items-center justify-center
bg-black text-white
rounded-full
overflow-hidden
transition-all duration-300
md:w-2 md:opacity-0 md:group-hover:w-36 md:group-hover:opacity-100
h-9
"
>

<div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition">

<a
href={downloadLink}
className="hover:text-blue-600 transition"
>
<Download size={20}/>
</a>

<span className="text-gray-500">|</span>

<button
onClick={toggleSave}
className={`hover:text-blue-600 transition ${
saved ? "text-blue-600" : ""
}`}
>
<Bookmark size={20} fill={saved ? "currentColor" : "none"} />
</button>

</div>

</div>

</div>

{/* LEFT */}

<button
onClick={prevImage}
className="absolute left-6 top-1/2 -translate-y-1/2 text-white bg-black/50 p-3 rounded-full hover:bg-black/70 transition"
>
<ChevronLeft size={32}/>
</button>

{/* RIGHT */}

<button
onClick={nextImage}
className="absolute right-6 top-1/2 -translate-y-1/2 text-white bg-black/50 p-3 rounded-full hover:bg-black/70 transition"
>
<ChevronRight size={32}/>
</button>

{/* CLOSE */}

<div
onClick={()=>setViewer(null)}
className="absolute inset-0 -z-10"
/>

</div>

)

}