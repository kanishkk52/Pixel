const newsletters = [

{
title:"Pixel Newsletter — January",
cover:"https://res.cloudinary.com/dwk329jcv/image/upload/v1774172266/delve_cover_pgw4iz.png",
pdf:"https://res.cloudinary.com/dwk329jcv/image/upload/v1774172320/Delve_1_compressed_vnc6nx.pdf"
},

{
title:"Pixel Newsletter — February",
cover:"https://res.cloudinary.com/dwk329jcv/image/upload/v1774172266/delve_cover_pgw4iz.png",
pdf:"https://res.cloudinary.com/dwk329jcv/image/upload/v1774172320/Delve_1_compressed_vnc6nx.pdf"
}

]

export default function Newsletter(){

return(

<div className="pt-28 min-h-screen bg-white dark:bg-black text-black dark:text-white">
    

<div className="max-w-6xl mx-auto px-8">

<h1 className="text-4xl font-introducing mb-16 text-center">
Newsletters
</h1>

<div className="grid md:grid-cols-2 gap-10">

{newsletters.map((n,i)=>(

<div
key={i}
className="bg-neutral-100 dark:bg-neutral-900 rounded-xl overflow-hidden shadow-lg hover:scale-[1.03] transition duration-300"
>

<img
src={n.cover}
className="w-full h-64 object-cover"
/>

<div className="p-6">

<h2 className="text-xl font-headersfont mb-4">
{n.title}
</h2>

<a
href={n.pdf}
target="_blank"
className="inline-block px-5 py-2 rounded-3xl font-buttonsfont bg-black text-white dark:bg-white dark:text-black"
>

Open Newsletter

</a>

</div>

</div>

))}

</div>

</div>

</div>

)

}