import useSvg from "hooks/general/useSvg"

function UserFillSvg({className = ""}: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            {
                useSvg(
                    `<path d="M12.5003 1.66663H7.50033C3.33366 1.66663 1.66699 3.33329 1.66699 7.49996V12.5C1.66699 15.65 2.61699 17.375 4.88366 18.0166C5.06699 15.85 7.29199 14.1416 10.0003 14.1416C12.7087 14.1416 14.9337 15.85 15.117 18.0166C17.3837 17.375 18.3337 15.65 18.3337 12.5V7.49996C18.3337 3.33329 16.667 1.66663 12.5003 1.66663ZM10.0003 11.8083C8.35033 11.8083 7.01699 10.4666 7.01699 8.81664C7.01699 7.16664 8.35033 5.83329 10.0003 5.83329C11.6503 5.83329 12.9837 7.16664 12.9837 8.81664C12.9837 10.4666 11.6503 11.8083 10.0003 11.8083Z" fill="var(--on-background-color)" stroke="var(--on-background-color)" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.9833 8.81672C12.9833 10.4667 11.6499 11.8084 9.99994 11.8084C8.34994 11.8084 7.0166 10.4667 7.0166 8.81672C7.0166 7.16672 8.34994 5.83337 9.99994 5.83337C11.6499 5.83337 12.9833 7.16672 12.9833 8.81672Z" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.1161 18.0166C14.3828 18.2333 13.5161 18.3333 12.4995 18.3333H7.49948C6.48281 18.3333 5.61615 18.2333 4.88281 18.0166C5.06615 15.85 7.29115 14.1416 9.99948 14.1416C12.7078 14.1416 14.9328 15.85 15.1161 18.0166Z" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>`,
                    "UserFillSvg",
                )
            }
        </svg>
    )
}

export default UserFillSvg
