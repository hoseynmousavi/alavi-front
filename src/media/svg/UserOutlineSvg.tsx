import useSvg from "hooks/general/useSvg"

function UserOutlineSvg({className}: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            {
                useSvg(
                    `<path d="M15.1171 18.0167C14.3838 18.2333 13.5171 18.3334 12.5005 18.3334H7.50046C6.48379 18.3334 5.61712 18.2333 4.88379 18.0167C5.06712 15.85 7.29212 14.1417 10.0005 14.1417C12.7088 14.1417 14.9338 15.85 15.1171 18.0167Z" stroke="var(--neutral-9-color)" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.5003 1.66669H7.50033C3.33366 1.66669 1.66699 3.33335 1.66699 7.50002V12.5C1.66699 15.65 2.61699 17.375 4.88366 18.0167C5.06699 15.85 7.29199 14.1417 10.0003 14.1417C12.7087 14.1417 14.9337 15.85 15.117 18.0167C17.3837 17.375 18.3337 15.65 18.3337 12.5V7.50002C18.3337 3.33335 16.667 1.66669 12.5003 1.66669ZM10.0003 11.8083C8.35033 11.8083 7.01699 10.4667 7.01699 8.8167C7.01699 7.1667 8.35033 5.83335 10.0003 5.83335C11.6503 5.83335 12.9837 7.1667 12.9837 8.8167C12.9837 10.4667 11.6503 11.8083 10.0003 11.8083Z" stroke="var(--neutral-9-color)" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.9833 8.81666C12.9833 10.4667 11.6499 11.8083 9.99994 11.8083C8.34994 11.8083 7.0166 10.4667 7.0166 8.81666C7.0166 7.16666 8.34994 5.83331 9.99994 5.83331C11.6499 5.83331 12.9833 7.16666 12.9833 8.81666Z" stroke="var(--neutral-9-color)" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>`,
                    "UserOutlineSvg",
                )
            }
        </svg>
    )
}

export default UserOutlineSvg
