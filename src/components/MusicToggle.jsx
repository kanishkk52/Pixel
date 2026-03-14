import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"

export default function MusicToggle(){

const audioRef = useRef(null)
const [playing,setPlaying] = useState(true)

useEffect(()=>{

audioRef.current = new Audio("public/music/lobby.mp3")
audioRef.current.loop = true
audioRef.current.volume = 0.4

audioRef.current.play().catch(()=>{})

return ()=> audioRef.current.pause()

},[])

const toggleMusic = ()=>{

if(!audioRef.current) return

if(playing){
audioRef.current.pause()
}else{
audioRef.current.play()
}

setPlaying(!playing)

}

return(

<button
onClick={toggleMusic}
className="fixed bottom-6 left-6 z-[999]
text-black dark:text-white
hover:scale-110 transition">

{playing ? <Volume2 size={26}/> : <VolumeX size={26}/>}

</button>

)

}