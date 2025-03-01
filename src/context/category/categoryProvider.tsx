import categoryReducer, {categoryInit} from "context/category/categoryReducer"
import {CategoryActionType, CategoryState} from "context/category/CategoryType"
import {createContext, Dispatch, ReactNode, useReducer} from "react"

// @ts-ignore
export const categoryContext = createContext<{ categoryState: CategoryState, categoryDispatch: Dispatch<CategoryActionType> }>(null)

function CategoryProvider({children, ...props}: { children: ReactNode }) {
    const [categoryState, categoryDispatch] = useReducer(categoryReducer, categoryInit(props))
    // const {getDone} = categoryState || {}

    // useEffect(() => {
    //     if (!getDone) {
    //         categoryActions.getList({categoryDispatch})
    //     }
    //     // eslint-disable-next-line
    // }, [])

    return (
        <categoryContext.Provider value={{categoryState, categoryDispatch}}>
            {children}
        </categoryContext.Provider>
    )
}

export default CategoryProvider
