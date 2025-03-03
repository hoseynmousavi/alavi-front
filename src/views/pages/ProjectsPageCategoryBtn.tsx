import {Dispatch, SetStateAction, useEffect, useRef} from "react"
import Button from "views/components/button/Button"

function ProjectsPageCategoryBtn({isActive, setCategoryId, title, id}: { isActive: boolean, setCategoryId: Dispatch<SetStateAction<number | null>>, title: string, id: number | null }) {
    const btnRef = useRef<HTMLDivElement & HTMLAnchorElement & HTMLButtonElement>(null)

    useEffect(() => {
        if (isActive) {
            btnRef.current?.scrollIntoView?.({inline: "center", block: "end"})
        }
        // eslint-disable-next-line
    }, [])

    function selectCategory() {
        setCategoryId(id)
    }

    return (
        <Button btnRef={btnRef} desktopType={isActive ? "primary" : "second-border"} desktopSize="medium" onClick={selectCategory}>
            {title}
        </Button>
    )
}

export default ProjectsPageCategoryBtn
