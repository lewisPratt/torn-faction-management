import ClearKeyButton from "./components/ClearKeyButton"
import type { LayoutProps } from "./interfaces"


function Layout({ children, handleClearKey }: LayoutProps) {
    return (
        <>
            <header>
                <nav>

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