import ClearKeyButton from "./components/ClearKeyButton"
import type { LayoutProps } from "./interfaces"


function Layout({ children, handleClearKey }: LayoutProps) {
    return (
        <>

                {children}

            <footer>
                <ClearKeyButton handleClearKey={handleClearKey} />
                <a href="https://github.com/lewisPratt/torn-faction-management/issues" target="_blank"><button>Bugs & Feature Requests</button></a>
            </footer>
        </>
    )
}

export default Layout