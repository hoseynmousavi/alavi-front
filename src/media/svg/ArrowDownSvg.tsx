import useSvg from "hooks/useSvg"

function ArrowDownSvg({className}: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 16 16">
            {
                useSvg(
                    `<path fill-rule="evenodd" clip-rule="evenodd" d="M3.3105 6.14035C3.50576 5.94509 3.82234 5.94508 4.01761 6.14033L8.00013 10.1226L11.9824 6.14034C12.1777 5.94508 12.4943 5.94508 12.6895 6.14034C12.8848 6.33561 12.8848 6.65219 12.6895 6.84745L8.35369 11.1833C8.15843 11.3786 7.84186 11.3786 7.64659 11.1833L3.31052 6.84746C3.11525 6.6522 3.11524 6.33562 3.3105 6.14035Z"/>`,
                    "ArrowDownSvg",
                )
            }
        </svg>
    )
}

export default ArrowDownSvg