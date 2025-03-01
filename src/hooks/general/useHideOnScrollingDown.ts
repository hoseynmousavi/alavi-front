import useLocation from "context/location/hooks/useLocation"
import useScreen from "context/screen/hooks/useScreen"
import useGetIsScrollingDown from "context/scroll/hooks/useGetIsScrollingDown"
import checkIfHide from "helpers/general/checkIfHide"

interface useHideOnScrollingDownProps {
    hidePages?: Array<string | { entry: string, routes: { [key: string]: string } }>,
    showPages?: Array<string>
    listenScroll?: boolean
}

function useHideOnScrollingDown({hidePages, showPages, listenScroll = true}: useHideOnScrollingDownProps) {
    const {location} = useLocation()
    const {isAppView} = useScreen()
    const {isScrollingDown} = useGetIsScrollingDown()
    const hideInThisPage = checkIfHide({location, hidePages, showPages})

    return {hide: hideInThisPage || (listenScroll ? isScrollingDown : false) || isAppView}
}

export default useHideOnScrollingDown
