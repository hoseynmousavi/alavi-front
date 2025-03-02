import projectReducer, {projectInit} from "context/project/projectReducer"
import {ProjectActionType, ProjectState} from "context/project/ProjectType"
import {createContext, Dispatch, ReactNode, useReducer} from "react"

// @ts-ignore
export const projectContext = createContext<{ projectState: ProjectState, projectDispatch: Dispatch<ProjectActionType> }>(null)

function ProjectProvider({children, ...props}: { children: ReactNode }) {
    const [projectState, projectDispatch] = useReducer(projectReducer, projectInit(props))
    return (
        <projectContext.Provider value={{projectState, projectDispatch}}>
            {children}
        </projectContext.Provider>
    )
}

export default ProjectProvider
