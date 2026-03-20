import { useEffect, useState } from "react"

export default function CustomCursor(){

const [isDesktop,setIsDesktop] = useState(true)

useEffect(()=>{

// detect touch device
const isTouch = window.matchMedia("(pointer: coarse)").matches
setIsDesktop(!isTouch)

// hide default cursor only on desktop
if(!isTouch){
document.body.style.cursor = "none"
}

return ()=>{
document.body.style.cursor = "default"
}

},[])

if(!isDesktop) return null // ❌ no cursor on mobile

return(
<div
id="custom-cursor"
className="fixed top-0 left-0 pointer-events-none z-[9999]"
>
{/* your aperture icon here */}
</div>
)
}