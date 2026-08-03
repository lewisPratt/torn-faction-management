import { NavLink, Route, Routes } from "react-router-dom"
import RankedWarReportView from "./RankedWarReportView"
import type { navProps } from "../interfaces"
import ChainReportView from "./ChainReportView";


function NavigationBar({ userData }: navProps) {
    const navLinkStyles = ({ isActive }: { isActive: boolean }) => ({
        color: isActive ? '#007bff' : '#333',
        textDecoration: isActive ? 'none' : 'underline',
        fontWeight: isActive ? 'bold' : 'normal',
        padding: '5px 10px'
    });
    return (
        <>
            <nav id="app-nav">
                <NavLink to="/torn-faction-management/" style={navLinkStyles} end>War Report</NavLink > |{" "}
                <NavLink to="/torn-faction-management/about" style={navLinkStyles} end>Chain Report</NavLink> |{" "}
                <NavLink to="/torn-faction-management/contact" style={navLinkStyles}end>Contact</NavLink>
            </nav>
            <Routes>
                <Route path="/torn-faction-management/" element={<RankedWarReportView userData={userData} />} />
                <Route path="/torn-faction-management/about" element={<ChainReportView userData={userData}/>} />
                <Route path="/torn-faction-management/contact" element={<Contact />} />
            </Routes>

        </>
    )


    function Contact() {
        return <p>Coming Soon.</p>
    }
}

export default NavigationBar