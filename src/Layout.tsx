import ClearKeyButton from "./components/ClearKeyButton"
import type { LayoutProps } from "./interfaces"


function Layout({ children, handleClearKey }: LayoutProps) {
    return (
        <>

                {children}

            <footer>
                <ClearKeyButton handleClearKey={handleClearKey} />
                <a href="https://github.com/lewisPratt/torn-faction-management/issues" target="_blank"><button>Bugs & Feature Requests</button></a>
                <a href="https://buymeacoffee.com/lewis19880g" target="_blank"><button>Buy me a Coffee!</button></a>

                
            </footer>
        </>
    )
}

export default Layout