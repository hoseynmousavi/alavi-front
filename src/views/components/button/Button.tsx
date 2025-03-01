import {memo, useRef} from "react"
import {ButtonType} from "types/ButtonType"
import Loader from "views/components/loading/Loader"
import MaterialLink from "views/components/material/MaterialLink"

function Button(props: ButtonType) {
    const {
        mobileType,
        desktopType,
        desktopIsFullWidth,
        mobileIsFullWidth,
        desktopSize,
        mobileSize,
        desktopIsSquare,
        mobileIsSquare,
        desktopIsRounded,
        mobileIsRounded,
        isLoading,
        isDisable,
        className = "",
        style,
        ariaLabel,
        children,
        link,
        onClick,
        onDisableClick,
        rippleColor,
        disableRipple,
        isDiv,
        btnRef: ref,
        escapeStart,
        escapeEnd,
        escapeBlock,
        dataTestId,
    } = props
    const tempRef = useRef<HTMLDivElement & HTMLAnchorElement & HTMLButtonElement>(null)
    const btnRef = ref || tempRef
    const desktopTypeClass = `desktop-${desktopType || mobileType || "primary"}`
    const mobileTypeClass = `mobile-${mobileType || desktopType || "primary"}`
    const desktopSizeClass = `desktop-${desktopSize || mobileSize || "large"}`
    const mobileSizeClass = `mobile-${mobileSize || desktopSize || "large"}`
    const desktopIsFullWidthClass = (typeof desktopIsFullWidth === "boolean" ? desktopIsFullWidth : mobileIsFullWidth) ? "desktop-full-width" : ""
    const mobileIsFullWidthClass = (typeof mobileIsFullWidth === "boolean" ? mobileIsFullWidth : desktopIsFullWidth) ? "mobile-full-width" : ""
    const desktopIsSquareClass = (typeof desktopIsSquare === "boolean" ? desktopIsSquare : mobileIsSquare) ? "desktop-square" : ""
    const mobileIsSquareClass = (typeof mobileIsSquare === "boolean" ? mobileIsSquare : desktopIsSquare) ? "mobile-square" : ""
    const desktopIsRoundedClass = (typeof desktopIsRounded === "boolean" ? desktopIsRounded : mobileIsRounded) ? "desktop-rounded" : ""
    const mobileIsRoundedClass = (typeof mobileIsRounded === "boolean" ? mobileIsRounded : desktopIsRounded) ? "mobile-rounded" : ""
    const btnClassName = [
        "btn",
        className,
        escapeStart ? "escape-start" : "",
        escapeEnd ? "escape-end" : "",
        escapeBlock ? "escape-block" : "",
        desktopTypeClass,
        mobileTypeClass,
        desktopSizeClass,
        mobileSizeClass,
        desktopIsFullWidthClass,
        mobileIsFullWidthClass,
        desktopIsSquareClass,
        mobileIsSquareClass,
        desktopIsRoundedClass,
        mobileIsRoundedClass,
        isLoading ? "is-loading" : "",
        isDisable ? "is-disable" : "",
    ].filter(item => !!item).join(" ")
    return (
        <MaterialLink className={btnClassName}
                      ariaLabel={ariaLabel}
                      style={style}
                      isDisable={isDisable || isLoading}
                      onClick={onClick}
                      onDisableClick={onDisableClick}
                      rippleColor={rippleColor}
                      disableRipple={disableRipple}
                      isDiv={isDiv}
                      link={link}
                      contRef={btnRef}
                      dataTestId={dataTestId}
        >
            {
                isLoading ?
                    <Loader width={20}/>
                    :
                    children
            }
        </MaterialLink>
    )
}

export default memo(Button)
