import { useState } from "react"

export default function Admin(){

const [eventId,setEventId] = useState("1")
const [preview,setPreview] = useState(null)

/* HANDLE FILE */

const handleFile = (e) => {

const files = Array.from(e.target.files)
if(files.length === 0) return

const stored = JSON.parse(localStorage.getItem("eventImages")) || {}

if(!stored[eventId]) stored[eventId] = []

files.forEach(file => {

if(!file.type.startsWith("image/")) return

const reader = new FileReader()

reader.onload = () => {
stored[eventId].push(reader.result)
localStorage.setItem("eventImages", JSON.stringify(stored))
}

reader.readAsDataURL(file)

})

alert("Images uploaded ✅")
}

return(

<div className="min-h-screen pt-24 px-6 bg-white dark:bg-black text-black dark:text-white">

<h1 className="text-3xl mb-6">Upload Images</h1>

{/* EVENT SELECT */}

<select
value={eventId}
onChange={(e)=>setEventId(e.target.value)}
className="mb-6 px-4 py-2 rounded border"
>
<option value="1">Photography Club Meetup</option>
<option value="2">Campus Nature Walk</option>
<option value="3">Hackathon Night</option>
</select>

{/* UPLOAD */}

<div className="max-w-md space-y-4">

<input
type="file"
accept="image/*"
multiple
onChange={handleFile}
/>

{preview && (
<img src={preview} className="rounded-xl"/>
)}

</div>

</div>

)
}