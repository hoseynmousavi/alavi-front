import SHOW_NAV_PAGES from "constant/routing/SHOW_NAV_PAGES"
import URLS from "constant/routing/URLS"
import useUser from "context/auth/hooks/useUser"
import useLocation from "context/location/hooks/useLocation"
import getTextConstant from "helpers/general/getTextConstant"
import useHideOnScrollingDown from "hooks/general/useHideOnScrollingDown"
import HeartFillSvg from "media/svg/HeartFillSvg"
import HeartOutlineSvg from "media/svg/HeartOutlineSvg"
import HomeFillSvg from "media/svg/HomeFillSvg"
import HomeOutlineSvg from "media/svg/HomeOutlineSvg"
import UserFillSvg from "media/svg/UserFillSvg"
import UserOutlineSvg from "media/svg/UserOutlineSvg"
import {useEffect, useRef} from "react"
import MobileNavbarItem from "views/components/mobile-navbar/MobileNavbarItem"

function MobileNavbar() {
    const {location} = useLocation()
    const activeIndex = useRef<number>(null)
    const {textConstant} = getTextConstant()
    const {hide} = useHideOnScrollingDown({showPages: SHOW_NAV_PAGES})
    const {isLoggedIn} = useUser()

    const items = [
        {Icon: HomeOutlineSvg, ActiveIcon: HomeFillSvg, title: textConstant.home, link: URLS.mainContainer.routes.home, replace: true},
        {Icon: HeartOutlineSvg, ActiveIcon: HeartFillSvg, title: textConstant.projectChance, link: URLS.mainContainer.routes.projects, replace: true},
        {Icon: UserOutlineSvg, ActiveIcon: UserFillSvg, title: textConstant.profile, link: isLoggedIn ? URLS.mainContainer.routes.profileMobile : URLS.loginContainer.routes.loginPhone, replace: isLoggedIn},
    ]

    for (let i = 0; i < items.length; i++) {
        const {link} = items[i]
        if (location === link) {
            activeIndex.current = i
            break
        }
    }

    useEffect(() => {
        document.documentElement.style.setProperty("--nav-mobile-height-dynamic", hide ? "0px" : "var(--nav-mobile-height)")
    }, [hide])

    return (
        <nav className={`navbar ${hide ? "hide" : ""}`}>
            {
                items.map((data, index) =>
                    <MobileNavbarItem key={index} data={data} isActive={activeIndex.current === index}/>,
                )
            }
        </nav>
    )
}

export default MobileNavbar
