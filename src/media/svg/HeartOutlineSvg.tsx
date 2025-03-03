import useSvg from "hooks/general/useSvg"

function HeartOutlineSvg({className}: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            {
                useSvg(
                    `<path d="M10.517 17.3416C10.2337 17.4416 9.76699 17.4416 9.48366 17.3416C7.06699 16.5166 1.66699 13.075 1.66699 7.24165C1.66699 4.66665 3.74199 2.58331 6.30033 2.58331C7.81699 2.58331 9.15866 3.31665 10.0003 4.44998C10.842 3.31665 12.192 2.58331 13.7003 2.58331C16.2587 2.58331 18.3337 4.66665 18.3337 7.24165C18.3337 13.075 12.9337 16.5166 10.517 17.3416Z" stroke="var(--neutral-9-color)" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>`,
                    "HeartOutlineSvg",
                )
            }
        </svg>
    )
}

export default HeartOutlineSvg
