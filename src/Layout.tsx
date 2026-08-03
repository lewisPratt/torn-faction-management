import ClearKeyButton from "./components/ClearKeyButton"
import type { LayoutProps } from "./interfaces"
import DarkMode from "./components/DarkMode"
import AppHeader from "./components/AppHeader"
import FactionInfoCard from "./components/FactionInfoCard"

function Layout({ children, handleClearKey, userData }: LayoutProps) {
    console.log(userData)
    return (
        <>
            {userData ?
                <>
                    <AppHeader id={userData.id} name={userData.name} level={userData.level} rank={userData.rank} title={userData.title} image={userData.image} faction_id={userData.faction_id} />
                    <FactionInfoCard />
                </>
                : null
            }
            <section id="main-content">

                {children}

            </section>

            <footer>
                <ClearKeyButton handleClearKey={handleClearKey} />
                <a href="https://github.com/lewisPratt/torn-faction-management/issues" target="_blank"><button>Bugs & Feature Requests</button></a>
                <a href="https://buymeacoffee.com/lewis19880g" target="_blank"><button>Buy me a Coffee!</button></a>
                <DarkMode />


            </footer>
        </>
    )
}

export default Layout