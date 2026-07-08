import ClearKeyButton from "./components/ClearKeyButton"
import type { LayoutProps } from "./interfaces"


function Layout({ children, handleClearKey }: LayoutProps) {
    return (
        <>
            <header>
                <nav>
                    <h1>Faction Dashboard</h1>
                </nav>
            </header>
            <main>

                {children}

            </main>
            <footer>
                <ClearKeyButton handleClearKey={handleClearKey} />
            </footer>
        </>
    )
}

export default Layout