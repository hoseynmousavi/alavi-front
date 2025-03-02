import AuthProvider from "context/auth/authProvider"
import CategoryProvider from "context/category/categoryProvider"
import {CategoryState} from "context/category/CategoryType"
import HomeProvider from "context/home/homeProvider"
import LocationProvider from "context/location/locationReducer"
import ProjectProvider from "context/project/projectProvider"
import ScreenProvider from "context/screen/screenProvider"
import ScrollProvider from "context/scroll/scrollProvider"
import ThemeProvider from "context/theme/themeProvider"
import {ReactNode} from "react"
import {ExpressRequestType} from "types/ExpressRequestType"

export let serverReq: ExpressRequestType

interface ContextWrapperProps {
    children: ReactNode,
    req?: ExpressRequestType,
    category?: CategoryState,
}

function ContextWrapper({children, req, ...props}: ContextWrapperProps) {
    if (req) {
        serverReq = req
    }
    return (
        <>
            <AuthProvider {...props}>
                <ScreenProvider {...props}>
                    <ThemeProvider {...props}>
                        <LocationProvider {...props}>
                            <ScrollProvider {...props}>
                                <CategoryProvider {...props}>
                                    <ProjectProvider {...props}>
                                        <HomeProvider {...props}>
                                            {children}
                                        </HomeProvider>
                                    </ProjectProvider>
                                </CategoryProvider>
                            </ScrollProvider>
                        </LocationProvider>
                    </ThemeProvider>
                </ScreenProvider>
            </AuthProvider>
        </>
    )
}

export default ContextWrapper
