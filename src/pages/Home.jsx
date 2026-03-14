import Hero from "../components/Hero"
import FilmRoll from "../components/FilmRoll"
import Team from "../components/Team"

export default function Home(){

return(

<div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">

<Hero/>

<FilmRoll/>

<Team/>

</div>

)

}