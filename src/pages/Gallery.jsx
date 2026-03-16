import { useNavigate } from "react-router-dom"

export default function Gallery(){

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
}

]

const navigate = useNavigate()

return(

<div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">

<h1 className="text-4xl font-introducing text-center pt-20">
Event Gallery
</h1>

<div className="max-w-6xl mx-auto px-8 mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-10">

{events.map(event=>(
<div
key={event.id}
onClick={()=>navigate(`/gallery/${event.id}`)}
className="cursor-pointer group"
>

<div className="relative overflow-hidden rounded-xl">

<img
src={event.cover}
className="w-full h-64 object-cover group-hover:scale-110 transition"
/>

<div className="absolute inset-0 bg-black/30 flex items-end p-4">

<h2 className="text-white text-xl font-semibold">
{event.name}
</h2>

</div>

</div>

</div>
))}

</div>

</div>

)

}