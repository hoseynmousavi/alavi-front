import useSvg from "hooks/general/useSvg"

function ProfileSvg({className}: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            {
                useSvg(
                    `<path d="M10.1331 9.05817C10.0498 9.04984 9.9498 9.04984 9.85814 9.05817C7.8748 8.9915 6.2998 7.3665 6.2998 5.3665C6.2998 3.32484 7.9498 1.6665 9.9998 1.6665C12.0415 1.6665 13.6998 3.32484 13.6998 5.3665C13.6915 7.3665 12.1165 8.9915 10.1331 9.05817Z" stroke="var(--on-background-color)" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.9666 12.1335C3.94993 13.4835 3.94993 15.6835 5.9666 17.0252C8.25827 18.5585 12.0166 18.5585 14.3083 17.0252C16.3249 15.6752 16.3249 13.4752 14.3083 12.1335C12.0249 10.6085 8.2666 10.6085 5.9666 12.1335Z" stroke="var(--on-background-color)" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>`,
                    "ProfileSvg",
                )
            }
        </svg>
    )
}

export default ProfileSvg
