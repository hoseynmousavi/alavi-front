import useSvg from "hooks/general/useSvg"

function LogoutColoredSvg({className}: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            {
                useSvg(
                    `<path d="M14.5332 12.1832L16.6665 10.0498L14.5332 7.9165" stroke="var(--error-color)" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.13281 10.0498H16.6078" stroke="var(--error-color)" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.79948 16.6668C6.11615 16.6668 3.13281 14.1668 3.13281 10.0002C3.13281 5.8335 6.11615 3.3335 9.79948 3.3335" stroke="var(--error-color)" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>`,
                    "LogoutColoredSvg",
                )
            }
        </svg>
    )
}

export default LogoutColoredSvg
