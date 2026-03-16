import React from "react"
import { motion } from "framer-motion"
import TeamParticles from "./TeamParticles"

const team = [

{
name:"Kanishk",
title:"Lead Photographer & Designer",
image:"https://res.cloudinary.com/dwk329jcv/image/upload/v1773512862/Me_CameraPic2_npr7ij.jpg",
hoverImage:"https://res.cloudinary.com/dwk329jcv/image/upload/v1773512341/photo3_qtudet.jpg",
bio:`Notice who isn’t in any of the photos? Yep — that’s me.
While everyone else is busy posing, I’m the one behind the lens capturing the moment before it disappears.
As Pixel’s lead photographer and designer, I turn everyday moments into visuals worth remembering.`
},

{
name:"Member Two",
title:"Creative Director",
image:"https://res.cloudinary.com/dwk329jcv/image/upload/v1773512862/Me_CameraPic2_npr7ij.jpg",
hoverImage:"https://res.cloudinary.com/dwk329jcv/image/upload/v1773512341/photo3_qtudet.jpg",
bio:`The one making sure every project has a visual story. From concept to final frame, they guide the creative direction of Pixel.`
},

{
name:"Member Three",
title:"Visual Editor",
image:"https://res.cloudinary.com/dwk329jcv/image/upload/v1773512862/Me_CameraPic2_npr7ij.jpg",
hoverImage:"https://res.cloudinary.com/dwk329jcv/image/upload/v1773512341/photo3_qtudet.jpg",
bio:`Turning raw shots into polished visuals. Color grading, retouching, and consistency — the magic that happens after the shutter clicks.`
},

{
name:"Member Four",
title:"Social Media Strategist",
image:"https://res.cloudinary.com/dwk329jcv/image/upload/v1773512862/Me_CameraPic2_npr7ij.jpg",
hoverImage:"https://res.cloudinary.com/dwk329jcv/image/upload/v1773512341/photo3_qtudet.jpg",
bio:`Making sure our visuals reach the right audience at the right time.`
},

{
name:"Member Five",
title:"Content Curator",
image:"https://res.cloudinary.com/dwk329jcv/image/upload/v1773512862/Me_CameraPic2_npr7ij.jpg",
hoverImage:"https://res.cloudinary.com/dwk329jcv/image/upload/v1773512341/photo3_qtudet.jpg",
bio:`Selecting the moments that matter. From hundreds of frames to the final highlight reel.`
}

]

export default function Team(){

return(

<section id="team" className="relative py-32 bg-white dark:bg-black overflow-hidden">

{/* Particle Background */}
<TeamParticles/>

{/* Content Layer */}
<div className="relative z-10">

<h2 className="text-4xl font-headersfont text-center mb-24">
Meet The Team
</h2>

<div className="max-w-6xl mx-auto px-8 space-y-32">

{team.map((member,i)=>(

<motion.div
key={i}
initial={{opacity:0, x: i%2===0 ? -120 : 120}}
whileInView={{opacity:1, x:0}}
transition={{duration:0.8}}
viewport={{once:true}}

className={`flex flex-col md:flex-row items-center gap-14 ${
i % 2 === 1 ? "md:flex-row-reverse" : ""
}`}
>

{/* IMAGE */}

<div className="relative group w-64 h-[420px] overflow-hidden rounded-[999px] shadow-2xl">

<img
src={member.image}
alt={member.name}
className="absolute w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
/>

<img
src={member.hoverImage}
alt={member.name}
className="absolute w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
/>

</div>


{/* TEXT */}

<div className="max-w-lg">

<h3 className="text-2xl font-introducing mb-2">
{member.name}
</h3>

<p className="text-sm opacity-70 mb-4">
{member.title}
</p>

<p className="text-lg font-buttonsfont opacity-90">
{member.bio}
</p>

</div>

</motion.div>

))}

</div>

</div>

</section>

)

}
//test