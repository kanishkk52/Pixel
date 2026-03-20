import { useNavigate } from "react-router-dom"
import TeamParticles from "../components/TeamParticles"
import { GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"

export default function Login(){

const navigate = useNavigate()

/* ✅ allowed domains */
const allowedDomains = ["sait.ac.in","saip.ac.in"]

/* ✅ multiple admin emails */
const adminEmails = [
  "kanishkk52@gmail.com",
  "altatrescue@gmail.com",
  "yashadlakpc@gmail.com",
  "biku.patel45@gmail.com"
]

const handleLoginSuccess = (credentialResponse)=>{

const decoded = jwtDecode(credentialResponse.credential)

const email = decoded.email
const domain = email.split("@")[1]

let ring = ""

/* ✅ ADMIN CHECK (FIXED) */
if(adminEmails.includes(email)){
  ring = "rainbow"

/* ✅ DOMAIN USERS */
}else if(allowedDomains.includes(domain)){

  if(domain === "sait.ac.in"){
    ring = "#b55f22"
  }

  if(domain === "saip.ac.in"){
    ring = "blue-600"
  }

}else{
  alert("Only approved emails can login")
  return
}

/* ✅ SAVE USER */
const user = {
  name: decoded.name,
  email: decoded.email,
  picture: decoded.picture,
  domain,
  ring
}

localStorage.setItem("pixelUser", JSON.stringify(user))

navigate("/username")

}

return(

<section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-black">

<TeamParticles/>

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

<div className="flex justify-center">
<GoogleLogin
onSuccess={handleLoginSuccess}
onError={()=>console.log("Login Failed")}
/>
</div>

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