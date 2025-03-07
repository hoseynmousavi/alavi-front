import useSvg from "hooks/general/useSvg"

function HomeOutlineSvg({className}: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            {
                useSvg(
                    `<path d="M10 15V12.5" stroke="var(--neutral-9-color)" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.39172 2.35004L2.61672 6.97504C1.96672 7.4917 1.55006 8.58337 1.69172 9.40004L2.80006 16.0334C3.00006 17.2167 4.13339 18.175 5.33339 18.175H14.6667C15.8584 18.175 17.0001 17.2084 17.2001 16.0334L18.3084 9.40004C18.4417 8.58337 18.0251 7.4917 17.3834 6.97504L11.6084 2.35837C10.7167 1.6417 9.27506 1.6417 8.39172 2.35004Z" stroke="var(--neutral-9-color)" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>`,
                    "HomeOutlineSvg",
                )
            }
        </svg>
    )
}

export default HomeOutlineSvg
