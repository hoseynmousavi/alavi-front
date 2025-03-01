import THEME from "constant/theme/THEME"
import getComputedStyleHelper from "helpers/theme/getComputedStyleHelper"
import themeManager from "helpers/theme/themeManager"
import useEffectJustChanges from "hooks/general/useEffectJustChanges"
import {useEffect, useState} from "react"

function useThemeColorBar() {
    const [barColors, setBarColors] = useState([getComputedStyleHelper(THEME.defaultColor)])
    const barColor = barColors[barColors.length - 1]

    useEffect(() => {
        function pushBarColor(event: { detail: { barColor: string } }) {
            const {barColor} = event.detail
            setBarColors(preBarColors => [...preBarColors, barColor])
        }

        return themeManager.subscribePushBarColor({callback: pushBarColor})
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        function popBarColor() {
            setBarColors(preBarColors => {
                const barColors = [...preBarColors]
                barColors.splice(barColors.length - 1, 1)
                if (barColors.length) return barColors
                else return [getComputedStyleHelper(THEME.defaultColor)]
            })
        }

        return themeManager.subscribePopBarColor({callback: popBarColor})
        // eslint-disable-next-line
    }, [])

    useEffectJustChanges(() => {
        const metaThemeColor = document.querySelector("meta[name=theme-color]")
        if (barColor && metaThemeColor) metaThemeColor.setAttribute("content", barColor)
    }, [barColor])
}

export default useThemeColorBar
