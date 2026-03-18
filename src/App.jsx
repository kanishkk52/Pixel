import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"

import Home from "./pages/Home"
import Feed from "./pages/Feed"
import Login from "./pages/Login"
import Newsletter from "./pages/Newsletter"
import Profile from "./pages/Profile"
import Gallery from "./pages/Gallery"
import EventGallery from "./pages/EventGallery"
import ImageViewer from "./pages/ImageViewer"
import FaceSetup from "./components/FaceSetup"
import FaceFilter from "./components/FaceFilter"
import UsernameSetup from "./pages/UsernameSetup"
import Navbar from "./components/Navbar"

import ThemeToggle from "./components/ThemeToggle"
function Layout(){

  const location = useLocation()

  // hide navbar on login page
  const hideNavbar = location.pathname === "/login"

  return (
    <>
      {!hideNavbar && <Navbar />}
         
      <ThemeToggle/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/gallery" element={<Gallery/>}/>
        <Route path="/gallery/:id" element={<EventGallery/>}/>
        <Route path="/face-setup" element={<FaceSetup/>} />
        <Route path="/face-filter" element={<FaceFilter/>} />
        <Route path="/username" element={<UsernameSetup />} />
        


      </Routes>
    </>
  )
}

function App() {

  return (
    <Router>
      <Layout />
    </Router>
  )

}

export default App
//TESTING