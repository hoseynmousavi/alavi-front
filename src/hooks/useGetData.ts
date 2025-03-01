import {useEffect, useRef, useState} from "react"

interface UseGetDataProps {
    getData: () => Promise<any> | undefined,
    isLoading: boolean,
    isRendering: boolean,
    dependencies?: Array<any>
}

function useGetData(props: UseGetDataProps) {
    const {getData, isLoading, isRendering, dependencies} = props
    const [notFound, setNotFound] = useState(false)
    const cancelToken = useRef<AbortController>(null)

    useEffect(() => {
        if (isRendering && isLoading) {
            getData()
                ?.catch?.(err => {
                setNotFound(err?.status === 404)
            })

            return () => {
                // eslint-disable-next-line
                cancelToken?.current?.abort?.("CANCEL")
            }
        }
        // eslint-disable-next-line
    }, [...(dependencies || []), isLoading, isRendering])

    return {notFound, cancelToken}
}

export default useGetData
