import projectActions from "context/project/projectActions"
import projectReducer, {projectInit} from "context/project/projectReducer"
import {ProjectActionType, ProjectState} from "context/project/ProjectType"
import {createContext, Dispatch, ReactNode, useEffect, useReducer} from "react"

// @ts-ignore
export const projectContext = createContext<{ projectState: ProjectState, projectDispatch: Dispatch<ProjectActionType> }>(null)

function ProjectProvider({children, ...props}: { children: ReactNode }) {
    const [projectState, projectDispatch] = useReducer(projectReducer, projectInit(props))
    const {getDone} = projectState || {}

    useEffect(() => {
        if (!getDone) {
            projectActions.getList({projectDispatch})
        }
        // eslint-disable-next-line
    }, [])

    return (
        <projectContext.Provider value={{projectState, projectDispatch}}>
            {children}
        </projectContext.Provider>
    )
}

export default ProjectProvider
