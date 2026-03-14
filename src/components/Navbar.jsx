import { Link } from "react-router-dom"

export default function Navbar(){

return(

<nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-neutral-200 dark:border-neutral-800 dark:text-white">

<div className="max-w-7xl mx-auto flex justify-between items-center p-4">

<Link to="/" className="font-headersfont text-xl">
Pixel
</Link>

<div className="flex gap-6">

<Link to="/">Home</Link>

<Link to="/feed">Feed</Link>

<Link to="/newsletter">Newsletter</Link>

</div>

</div>

</nav>

)

}

