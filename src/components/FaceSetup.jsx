import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

export default function FaceSetup(){

const navigate = useNavigate()

const videoRef = useRef(null)
const canvasRef = useRef(null)
const streamRef = useRef(null)

const [image,setImage] = useState(null)
const [cameraOn,setCameraOn] = useState(false)
const [error,setError] = useState("")

/* START CAMERA */

const startCamera = async () => {
try{

const stream = await navigator.mediaDevices.getUserMedia({
video: { facingMode: "user" }
})

streamRef.current = stream

if(videoRef.current){
videoRef.current.srcObject = stream

/* wait for video to load */
videoRef.current.onloadedmetadata = () => {
videoRef.current.play()
}
}

setCameraOn(true)
setError("")

}catch(err){
console.error(err)
setError("Camera access denied or not available")
}
}

/* CAPTURE FACE */

const capture = () => {

const video = videoRef.current
const canvas = canvasRef.current

if(!video || !canvas) return

/* ensure video is ready */
if(video.videoWidth === 0){
alert("Camera not ready yet")
return
}

canvas.width = video.videoWidth
canvas.height = video.videoHeight

const ctx = canvas.getContext("2d")

ctx.drawImage(video,0,0)

const data = canvas.toDataURL("image/png")

setImage(data)

/* STOP CAMERA CLEANLY */
if(streamRef.current){
streamRef.current.getTracks().forEach(track => track.stop())
}

setCameraOn(false)
}

/* SAVE FACE */

const handleSave = () => {

if(!image){
alert("Capture image first")
return
}

/* save locally */
localStorage.setItem("faceData", image)

/* optional: debug */
console.log("Face saved:", image.substring(0,50))

navigate("/gallery") // FIXED ROUTE
}

/* SKIP */

const handleSkip = () => {
navigate("/gallery")
}

return(

<div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white dark:bg-black text-black dark:text-white">

<h1 className="text-3xl mb-4 text-center">
Set Up Face Recognition
</h1>

<p className="text-gray-500 text-center max-w-md mb-8">
Capture your face so we can automatically find photos you appear in.
You can skip this and add it later.
</p>

{/* CAMERA AREA */}

<div className="w-full max-w-md">

{!image ? (

<div className="space-y-4">

{cameraOn ? (
<video
ref={videoRef}
autoPlay
playsInline
muted
className="rounded-xl w-full h-64 object-cover bg-black"
/>
) : (
<div className="h-64 flex items-center justify-center border rounded-xl border-neutral-300 dark:border-neutral-700">
<span className="opacity-60">Camera preview</span>
</div>
)}

{error && (
<p className="text-red-500 text-sm text-center">{error}</p>
)}

<canvas ref={canvasRef} className="hidden"/>

<div className="flex gap-3">

{!cameraOn ? (
<button
onClick={startCamera}
className="flex-1 py-2 rounded-xl bg-blue-600 text-white"
>
Start Camera
</button>
) : (
<button
onClick={capture}
className="flex-1 py-2 rounded-xl bg-green-600 text-white"
>
Capture
</button>
)}

<button
onClick={handleSkip}
className="flex-1 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700"
>
Skip
</button>

</div>

</div>

) : (

<div className="space-y-4">

<img
src={image}
className="rounded-xl w-full h-64 object-cover"
/>

<div className="flex gap-3">

<button
onClick={handleSave}
className="flex-1 py-2 rounded-xl bg-blue-600 text-white"
>
Save Face
</button>

<button
onClick={()=>{
setImage(null)
startCamera()
}}
className="flex-1 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700"
>
Retake
</button>

</div>

<button
onClick={handleSkip}
className="w-full py-2 text-sm text-gray-500"
>
Skip for now
</button>

</div>

)}

</div>

</div>

)

}