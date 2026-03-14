import { useNavigate } from "react-router-dom"
import TeamParticles from "../components/TeamParticles"

export default function Login(){

const navigate = useNavigate()

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
<p className="dark:text-gray-500 light:text-black mb-8">
Your <i>moments</i>, organised <i>beautifully!</i>
</p>

<div className="flex flex-col gap-4 w-[260px]"></div>

<div className="flex flex-col gap-4 w-[260px]">

{/* GOOGLE LOGIN */}

<button className="dark:text-white light: text-black w-full py-3 rounded-xl border border-white/30 
hover:bg-white/10 transition flex items-center justify-center gap-3">

<img
src="https://www.svgrepo.com/show/475656/google-color.svg"
className="w-5"
/>

Login with Google

</button>

{/* GUEST */}

<button
onClick={()=>navigate("/feed")}
className="dark:text-gray-400 light: text-gray-600 w-full py-3 rounded-xl  hover:bg-white/10 transition"
>

Browse as Guest

</button>

</div>

</div>

</section>

)

}