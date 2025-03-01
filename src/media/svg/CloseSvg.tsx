import useSvg from "hooks/useSvg"

function CloseSvg({className}: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            {
                useSvg(
                    `<path fill-rule="evenodd" clip-rule="evenodd" d="M19.7969 4.20312C20.0677 4.47394 20.0677 4.91303 19.7969 5.18386L5.18386 19.7969C4.91303 20.0677 4.47394 20.0677 4.20312 19.7969C3.93229 19.5261 3.93229 19.087 4.20312 18.8161L18.8161 4.20312C19.087 3.93229 19.5261 3.93229 19.7969 4.20312Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.20312 4.20312C4.47394 3.93229 4.91303 3.93229 5.18386 4.20312L19.7969 18.8161C20.0677 19.087 20.0677 19.5261 19.7969 19.7969C19.5261 20.0677 19.087 20.0677 18.8161 19.7969L4.20312 5.18386C3.93229 4.91303 3.93229 4.47394 4.20312 4.20312Z"/>`,
                    "CloseSvg",
                )
            }
        </svg>
    )
}

export default CloseSvg
