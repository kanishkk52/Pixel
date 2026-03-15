import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"

import Home from "./pages/Home"
import Feed from "./pages/Feed"
import Login from "./pages/Login"
import Newsletter from "./pages/Newsletter"
import Profile from "./pages/Profile"
import Navbar from "./components/Navbar"
import MusicToggle from "./components/MusicToggle"
import ThemeToggle from "./components/ThemeToggle"
function Layout(){

  const location = useLocation()

  // hide navbar on login page
  const hideNavbar = location.pathname === "/login"

  return (
    <>
      {!hideNavbar && <Navbar />}
      <MusicToggle/>        
      <ThemeToggle/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/profile" element={<Profile />} />
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