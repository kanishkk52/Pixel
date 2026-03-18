import { useNavigate } from "react-router-dom"
import TeamParticles from "../components/TeamParticles"
import { GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"

export default function Login(){

const navigate = useNavigate()

// allowed email domains
const allowedDomains = ["sait.ac.in","saip.ac.in"]

const handleLoginSuccess = (credentialResponse)=>{

const decoded = jwtDecode(credentialResponse.credential)

const email = decoded.email
const domain = email.split("@")[1]

if(allowedDomains.includes(domain)){

console.log("Allowed user:", email)

// save user so Navbar + Profile can access it
const user = {
name: decoded.name,
email: decoded.email,
picture: decoded.picture,
domain: "sait.ac.in"
}

localStorage.setItem("pixelUser", JSON.stringify(user))

navigate("/username")

}else{

alert("Only approved college domains can login")

}

}

return(

<section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-black">

{/* PARTICLES */}
<TeamParticles/>

{/* LOGIN CARD */}

<div className="relative z-10
backdrop-blur-2xl
bg-white/20 dark:bg-black/20
border border-white/30 dark:border-white/10
rounded-3xl
px-12 py-14
shadow-xl
flex flex-col items-center text-center">

<h1 className="text-5xl font-pixel mb-10 text-blue-600">
Pixel
</h1>

<p className="text-black dark:text-gray-400 mb-8">
Your <i>moments</i>, organised <i>beautifully!</i>
</p>

<div className="flex flex-col gap-4 w-[260px]">

{/* GOOGLE LOGIN */}

<div className="flex justify-center">
<GoogleLogin
onSuccess={handleLoginSuccess}
onError={()=>console.log("Login Failed")}
/>
</div>

{/* GUEST */}

<button
onClick={()=>navigate("/feed")}
className="text-gray-600 dark:text-gray-400 w-full py-3 rounded-xl hover:bg-white/10 transition"
>

Browse as Guest

</button>

</div>

</div>

</section>

)

}