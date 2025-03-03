import useSvg from "hooks/general/useSvg"

function HeartFillSvg({className}: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            {
                useSvg(
                    `<path d="M13.7003 2.58325C12.192 2.58325 10.842 3.31659 10.0003 4.44159C9.15866 3.31659 7.80866 2.58325 6.30033 2.58325C3.74199 2.58325 1.66699 4.66659 1.66699 7.24158C1.66699 8.23325 1.82533 9.14992 2.10033 9.99992C3.41699 14.1666 7.47533 16.6583 9.48366 17.3416C9.76699 17.4416 10.2337 17.4416 10.517 17.3416C12.5253 16.6583 16.5837 14.1666 17.9003 9.99992C18.1753 9.14992 18.3337 8.23325 18.3337 7.24158C18.3337 4.66659 16.2587 2.58325 13.7003 2.58325Z" fill="var(--on-background-color)"/>`,
                    "HeartFillSvg",
                )
            }
        </svg>
    )
}

export default HeartFillSvg
