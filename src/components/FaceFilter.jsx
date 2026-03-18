import { useNavigate } from "react-router-dom"

export default function FaceFilter(){

const navigate = useNavigate()
const faceData = localStorage.getItem("faceData")

return(

<div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white dark:bg-black text-black dark:text-white">

<h1 className="text-3xl mb-4">
Your Photos
</h1>

{!faceData ? (

<div className="text-center space-y-4">

<p className="text-gray-500">
No face data found. Add your face to enable this feature.
</p>

<button
onClick={()=>navigate("/face-setup")}
className="px-5 py-2 rounded-xl bg-blue-600 text-white"
>
Set Up Face Recognition
</button>

</div>

) : (

<div className="text-center space-y-4">

<img src={faceData} className="w-32 h-32 rounded-full object-cover"/>

<p className="text-gray-500">
(Photos containing your face will appear here)
</p>

</div>

)}

</div>

)

}