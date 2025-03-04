import useSvg from "hooks/general/useSvg"

function TransactionColoredSvg({className}: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            {
                useSvg(
                    `<path d="M1.66699 7.0835H12.0837" stroke="var(--on-background-color)" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 13.75H6.66667" stroke="var(--on-background-color)" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.75 13.75H12.0833" stroke="var(--on-background-color)" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.3337 11.6915V13.4248C18.3337 16.3498 17.592 17.0832 14.6337 17.0832H5.36699C2.40866 17.0832 1.66699 16.3498 1.66699 13.4248V6.57484C1.66699 3.64984 2.40866 2.9165 5.36699 2.9165H12.0837" stroke="var(--on-background-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.667 7.9165V2.9165L18.3337 4.58317" stroke="var(--on-background-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.6667 2.9165L15 4.58317" stroke="var(--on-background-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
                    "TransactionColoredSvg",
                )
            }
        </svg>
    )
}

export default TransactionColoredSvg
