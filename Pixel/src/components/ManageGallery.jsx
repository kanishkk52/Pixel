import { useState, useEffect } from "react"

export default function ManageGallery(){

<<<<<<< HEAD:Pixel/src/components/ManageGallery.jsx
const [eventId,setEventId] = useState("1")
const [images,setImages] = useState([])
const [uploading,setUploading] = useState(false)

/* LOAD IMAGES */

const loadImages = async () => {
try{
const res = await fetch(`http://localhost:8000/api/images/?event_id=${eventId}`)
const data = await res.json()
setImages(data)
}catch(err){
console.error(err)
}
}

useEffect(()=>{
loadImages()
},[eventId])
=======
const [folder,setFolder] = useState("")
const [newFolder,setNewFolder] = useState("")
const [folders,setFolders] = useState([])

/* LOAD FOLDERS */

useEffect(()=>{

const loadFolders = () => {
const stored = JSON.parse(localStorage.getItem("eventImages")) || {}
setFolders(Object.keys(stored))
}

loadFolders()

window.addEventListener("storage", loadFolders)
return ()=>window.removeEventListener("storage", loadFolders)

},[])

/* CREATE FOLDER */

const createFolder = () => {

if(!newFolder.trim()) return

const stored = JSON.parse(localStorage.getItem("eventImages")) || {}

if(stored[newFolder]){
alert("Folder already exists")
return
}

stored[newFolder] = []

localStorage.setItem("eventImages", JSON.stringify(stored))
window.dispatchEvent(new Event("storage"))

setFolder(newFolder)
setNewFolder("")
}
>>>>>>> 8a44c1314bc00e3dc2c0691aa836cf75a52cb3a8:src/components/ManageGallery.jsx

/* UPLOAD MULTIPLE */

const handleUpload = async (e) => {

const files = Array.from(e.target.files)
<<<<<<< HEAD:Pixel/src/components/ManageGallery.jsx
if(!files.length) return

try{

setUploading(true)

const formData = new FormData()

files.forEach(file=>{
formData.append("images", file)
})

formData.append("event_id", eventId)
formData.append("uploaded_by", "admin")

await fetch("http://localhost:8000/api/images/upload/",{
method:"POST",
body:formData
})

alert("Images uploaded ✅")
loadImages()

}catch(err){
console.error(err)
alert("Upload failed ❌")
}finally{
setUploading(false)
}

}

return(

<div className="space-y-6">

{/* EVENT SELECT */}

<select
value={eventId}
onChange={(e)=>setEventId(e.target.value)}
className="px-4 py-2 border rounded"
>
<option value="1">Photography Club Meetup</option>
<option value="2">Campus Nature Walk</option>
<option value="3">Hackathon Night</option>
</select>

{/* UPLOAD */}

<input type="file" multiple accept="image/*" onChange={handleUpload}/>

{uploading && <p>Uploading...</p>}

{/* GALLERY */}

<div className="grid grid-cols-3 gap-4">

{images.map((img,i)=>(
<img key={i} src={img.url} className="rounded-lg"/>
=======
if(!folder || files.length === 0) return

const stored = JSON.parse(localStorage.getItem("eventImages")) || {}

if(!stored[folder]) stored[folder] = []

/* convert all files properly */
const readFile = (file) => {
return new Promise((resolve) => {
const reader = new FileReader()
reader.onload = () => resolve(reader.result)
reader.readAsDataURL(file)
})
}

const images = await Promise.all(files.map(readFile))

stored[folder] = [...stored[folder], ...images]

localStorage.setItem("eventImages", JSON.stringify(stored))
window.dispatchEvent(new Event("storage"))

alert("Uploaded ✅")
}

/* DELETE IMAGE */

const deleteImage = (index) => {

const stored = JSON.parse(localStorage.getItem("eventImages")) || {}

stored[folder].splice(index,1)

localStorage.setItem("eventImages", JSON.stringify(stored))
window.dispatchEvent(new Event("storage"))
}

/* DELETE FOLDER */

const deleteFolder = () => {

if(!folder) return

const confirmDelete = confirm("Delete this folder?")
if(!confirmDelete) return

const stored = JSON.parse(localStorage.getItem("eventImages")) || {}

delete stored[folder]

localStorage.setItem("eventImages", JSON.stringify(stored))
window.dispatchEvent(new Event("storage"))

setFolder("")
}

const currentImages =
(JSON.parse(localStorage.getItem("eventImages")) || {})[folder] || []

return(

<div className="space-y-6 font-buttonsfont">

{/* CREATE */}

<div className="flex gap-3">

<input
value={newFolder}
onChange={(e)=>setNewFolder(e.target.value)}
placeholder="New folder name"
className="border px-3 py-2 rounded dark:text-black"
/>

<button
onClick={createFolder}
className="bg-blue-600 text-white px-4 rounded-full"
>
Create
</button>

</div>

{/* SELECT */}

<div className="flex gap-3 items-center">

<select
value={folder}
onChange={(e)=>setFolder(e.target.value)}
className="px-4 py-2 border rounded dark:text-black"
>
<option value="">Select folder</option>
{folders.map(f=>(
<option key={f}>{f}</option>
))}
</select>

{folder && (
<button
onClick={deleteFolder}
className="text-red-600 text-sm"
>
Delete Folder
</button>
)}

</div>

{/* UPLOAD */}

{folder && (
<input
type="file"
multiple
accept="image/*"
onChange={handleUpload}
/>
)}

{/* PREVIEW + DELETE */}

{folder && currentImages.length > 0 && (

<div className="grid grid-cols-3 gap-4">

{currentImages.map((img,i)=>(
<div key={i} className="relative group">

<img
src={img}
className="rounded-lg h-32 w-full object-cover"
/>

<button
onClick={()=>deleteImage(i)}
className="
absolute top-1 right-1
bg-black/70 text-white text-xs px-2 py-1
rounded opacity-0 group-hover:opacity-100
"
>
Delete
</button>

</div>
>>>>>>> 8a44c1314bc00e3dc2c0691aa836cf75a52cb3a8:src/components/ManageGallery.jsx
))}

</div>

<<<<<<< HEAD:Pixel/src/components/ManageGallery.jsx
=======
)}

>>>>>>> 8a44c1314bc00e3dc2c0691aa836cf75a52cb3a8:src/components/ManageGallery.jsx
</div>

)
}