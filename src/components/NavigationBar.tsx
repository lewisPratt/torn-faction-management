import { Link, Route, Routes } from "react-router-dom"
import RankedWarReportView from "./RankedWarReportView"
import type { navProps } from "../interfaces"
import AboutApp from "./AboutApp"


function NavigationBar({userData} : navProps) {
    return (
        <>
            <nav id="app-nav">
                <Link to="/torn-faction-management/">Home</Link> |{" "}
                <Link to="/torn-faction-management/about">About</Link> |{" "}
                <Link to="/torn-faction-management/contact">Contact</Link>
            </nav>
            <Routes>
                <Route path="/torn-faction-management/" element={<RankedWarReportView userData={userData} />} />
                <Route path="/torn-faction-management/about" element={<AboutApp />} />
                <Route path="/torn-faction-management/contact" element={<Contact />} />
            </Routes>

        </>
    )


  function Contact() {
    return <p>This is a contact page</p>
  }
}

export default NavigationBar