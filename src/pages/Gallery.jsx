import { useNavigate } from "react-router-dom"
import { useRef, useState, useEffect } from "react"

export default function Gallery(){

const navigate = useNavigate()

/* EVENTS */

const events = [
{
id:1,
name:"Photography Club Meetup",
cover:"https://res.cloudinary.com/dwk329jcv/image/upload/v1773512354/photo6_p5lng5.jpg"
},
{
id:2,
name:"Campus Nature Walk",
cover:"https://res.cloudinary.com/dwk329jcv/image/upload/v1773512346/photo10_m1fzw9.jpg"
},
{
id:3,
name:"Hackathon Night",
cover:"https://res.cloudinary.com/dwk329jcv/image/upload/v1773512341/photo5_cdywlo.jpg"
},
{
id:4,
name:"Cultural Fest",
cover:"https://res.cloudinary.com/dwk329jcv/image/upload/v1773512354/photo6_p5lng5.jpg"
},
{
id:5,
name:"Sports Day",
cover:"https://res.cloudinary.com/dwk329jcv/image/upload/v1773512346/photo10_m1fzw9.jpg"
},
{
id:6,
name:"Workshop Series",
cover:"https://res.cloudinary.com/dwk329jcv/image/upload/v1773512341/photo5_cdywlo.jpg"
}
]

/* SEARCH */

const [search,setSearch] = useState("")

const filteredEvents = events.filter(event =>
event.name.toLowerCase().includes(search.toLowerCase())
)

/* SCROLL SYSTEM */

const sectionRefs = useRef([])
const [activeIndex,setActiveIndex] = useState(0)

useEffect(()=>{

const handleScroll = () => {
sectionRefs.current.forEach((section,i)=>{
if(!section) return

const rect = section.getBoundingClientRect()

if(rect.top < 200 && rect.bottom > 200){
setActiveIndex(i)
}
})
}

window.addEventListener("scroll",handleScroll)
return ()=>window.removeEventListener("scroll",handleScroll)

},[])

return(

<div className="min-h-screen bg-white dark:bg-black text-black dark:text-white overflow-x-hidden">

<h1 className="text-4xl font-introducing text-center pt-20">
Event Gallery
</h1>

{/* ✅ SEARCH BAR */}

<div className="flex justify-center mt-6 px-4">

<input
type="text"
placeholder="Search events..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="
w-full max-w-2xl
px-6 py-3
rounded-full
bg-white/40 dark:bg-white/10
backdrop-blur-md
border border-gray-300 dark:border-white/20
text-black dark:text-white
placeholder-gray-600 dark:placeholder-gray-300
shadow-sm
focus:outline-none focus:ring-2 focus:ring-blue-500
transition
"
/>

</div>

{/* EVENTS */}

<div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-8 mt-16 space-y-24">

{filteredEvents.length === 0 ? (

<p className="text-center text-gray-500">
No events found.
</p>

) : (

filteredEvents.map((event,index)=>(
<div
key={event.id}
ref={(el)=>sectionRefs.current[index]=el}
onClick={()=>navigate(`/gallery/${event.id}`)}
className="cursor-pointer group"
>

<div className="relative overflow-hidden rounded-xl">

<img
src={event.cover}
className="w-full h-56 sm:h-64 object-cover group-hover:scale-110 transition"
/>

<div className="absolute inset-0 bg-black/30 flex items-end p-4">

<h2 className="text-white text-lg sm:text-xl font-semibold">
{event.name}
</h2>

</div>

</div>

</div>
))

)}

</div>

{/* ✅ DESKTOP ONLY NAVIGATOR */}

<div className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 flex-col gap-3 z-50">

{filteredEvents.map((event,index)=>(
<div
key={event.id}
onClick={()=>{
sectionRefs.current[index]?.scrollIntoView({behavior:"smooth"})
}}
className={`group relative w-2 h-6 rounded-full cursor-pointer transition
${activeIndex === index ? "bg-blue-600" : "bg-neutral-400"}
`}
>

<span className="absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap
bg-black text-white text-xs px-2 py-1 rounded opacity-0
group-hover:opacity-100 transition"
>
{event.name}
</span>

</div>
))}

</div>

</div>

)

}