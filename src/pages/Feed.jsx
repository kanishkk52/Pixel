export default function Feed(){

return(

<div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">

<h1 className="text-4xl font-introducing text-center pt-20">
Event Feed
</h1>

<div className="max-w-3xl mx-auto mt-16 space-y-10">

{/* Post */}

<div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow">

<h2 className="font-semibold text-xl mb-2">
Photography Club Meetup
</h2>

<p className="opacity-80 mb-4">
Amazing moments from today's meetup.
</p>

<img
src="https://res.cloudinary.com/dwk329jcv/image/upload/v1773512354/photo6_p5lng5.jpg"
className="rounded-lg"
/>

<div className="flex gap-6 mt-4 text-sm opacity-70">

<button>❤️ Like</button>
<button>💬 Comment</button>
<button>🔁 Share</button>

</div>

</div>

</div>

<div className="max-w-3xl mx-auto mt-16 space-y-10">

{/* Post */}

<div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow">

<h2 className="font-semibold text-xl mb-2">
Photography Club Meetup
</h2>

<p className="opacity-80 mb-4">
Amazing moments from today's meetup.
</p>

<img
src="https://res.cloudinary.com/dwk329jcv/image/upload/v1773512341/photo2_pflffl.jpg"
className="rounded-lg"
/>

<div className="flex gap-6 mt-4 text-sm opacity-70">

<button>❤️ Like</button>
<button>💬 Comment</button>
<button>🔁 Share</button>

</div>

</div>

</div>

<div className="max-w-3xl mx-auto mt-16 space-y-10">

{/* Post */}

<div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow">

<h2 className="font-semibold text-xl mb-2">
Photography Club Meetup
</h2>

<p className="opacity-80 mb-4">
Amazing moments from today's meetup.
</p>

<img
src="https://res.cloudinary.com/dwk329jcv/image/upload/v1773512341/photo5_cdywlo.jpg"
className="rounded-lg"
/>

<div className="flex gap-6 mt-4 text-sm opacity-70">

<button>❤️ Like</button>
<button>💬 Comment</button>
<button>🔁 Share</button>

</div>

</div>

</div>
</div>

)

}