import {memo} from "react"
import {MaterialLinkType} from "types/MaterialLinkType"
import useMaterialLink from "views/components/material/useMaterialLink"

function MaterialLink(props: MaterialLinkType) {
    const {
        children,
        isDiv,
        rippleColor,
        className = "",
        style,
        onClick,
        onDisableClick,
        isDisable,
        disableRipple,
        ariaLabel,
        link,
        contRef,
        onMouseEnter,
        onMouseLeave,
        dataTestId,
        referrerPolicy,
    } = props

    const {to, target} = link || {}
    const Tag = isDiv ? "div" : to ? "a" : "button"
    const {propRef, _onClick} = useMaterialLink({onClick, rippleColor, isDisable, disableRipple, onDisableClick, contRef, link})
    return (
        <Tag aria-label={isDiv ? undefined : ariaLabel}
             ref={propRef}
             style={style}
             className={`material ${className}`}
             disabled={isDisable}
             onClick={_onClick}
             href={to}
             target={target}
             onMouseEnter={onMouseEnter}
             onMouseLeave={onMouseLeave}
             data-testid={dataTestId}
             referrerPolicy={referrerPolicy}
        >
            {children}
        </Tag>
    )
}

export default memo(MaterialLink)