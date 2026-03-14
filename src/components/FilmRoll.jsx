import React from "react"
import "../filmroll.css"

const images = [
"public/photos/photo1.jpg",   
"public/photos/photo2.jpg",
"public/photos/photo3.jpg",
"public/photos/photo4.jpg",
"public/photos/photo5.jpg",
"public/photos/photo12.jpg",
"public/photos/photo8.jpg",
"public/photos/photo9.jpg",
"public/photos/photo10.jpg",
"public/photos/photo11.jpg" 
]

export default function FilmRoll(){

return(

<section id = "filmroll" className="film-section">

<h2 className="film-title font-headersfont" >Captured Moments</h2>

<div className="film-wrapper">

<div className="film-track">

{images.concat(images).map((src,i)=>(
<div className="film-frame" key={i}>
<img src={src} />
</div>
))}

</div>

</div>

</section>

)

}