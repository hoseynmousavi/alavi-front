import LoadingBorderSvg from "media/svg/LoadingBorderSvg"

interface LoadingWrapperProps {
    className?: string,
}

function LoadingWrapper(props: LoadingWrapperProps) {
    const {className} = props
    return (
        <div className={`loading-wrapper ${className}`}>
            <div className="loading-wrapper-content">
                <LoadingBorderSvg className="loading-wrapper-content-border"/>
                {/*<LogoSvg className="loading-wrapper-content-logo"/>*/}
            </div>
        </div>
    )
}

export default LoadingWrapper
