import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

export default function FaceSetup(){

const navigate = useNavigate()
const videoRef = useRef(null)
const canvasRef = useRef(null)

const [image,setImage] = useState(null)
const [cameraOn,setCameraOn] = useState(false)

/* START CAMERA */

const startCamera = async () => {
const stream = await navigator.mediaDevices.getUserMedia({ video: true })
videoRef.current.srcObject = stream
setCameraOn(true)
}

/* CAPTURE FACE */

const capture = () => {
const canvas = canvasRef.current
const video = videoRef.current

canvas.width = video.videoWidth
canvas.height = video.videoHeight

const ctx = canvas.getContext("2d")
ctx.drawImage(video,0,0)

const data = canvas.toDataURL("image/png")
setImage(data)

/* stop camera */
video.srcObject.getTracks().forEach(track => track.stop())
setCameraOn(false)
}

/* SAVE (for now localStorage) */

const handleSave = () => {
localStorage.setItem("faceData", image)
navigate("/feed")
}

/* SKIP */

const handleSkip = () => {
navigate("/feed")
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

{/* CAMERA / PREVIEW */}

<div className="w-full max-w-md">

{!image ? (

<div className="space-y-4">

{cameraOn ? (
<video ref={videoRef} autoPlay className="rounded-xl w-full"/>
) : (
<div className="h-64 flex items-center justify-center border rounded-xl border-neutral-300 dark:border-neutral-700">
<span className="opacity-60">Camera preview</span>
</div>
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

<img src={image} className="rounded-xl"/>

<div className="flex gap-3">

<button
onClick={handleSave}
className="flex-1 py-2 rounded-xl bg-blue-600 text-white"
>
Save Face
</button>

<button
onClick={()=>setImage(null)}
className="flex-1 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700"
>
Retake
</button>

</div>

<button
onClick={handleSkip}
className="w-full py-2 rounded-xl text-sm text-gray-500"
>
Skip for now
</button>

</div>

)}

</div>

</div>

)

}