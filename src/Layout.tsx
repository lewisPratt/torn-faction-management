import ClearKeyButton from "./components/ClearKeyButton"
import type { LayoutProps } from "./interfaces"


function Layout({ children, handleClearKey }: LayoutProps) {
    return (
        <>

                {children}

            <footer>
                <ClearKeyButton handleClearKey={handleClearKey} />
            </footer>
        </>
    )
}

export default Layout