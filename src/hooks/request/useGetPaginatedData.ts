import useEffectJustChanges from "hooks/general/useEffectJustChanges"
import useSyncedState from "hooks/general/useSyncedState"
import {useCallback, useEffect, useRef, useState} from "react"

interface useGetPaginatedDataProps {
    offset?: number,
    // @ts-ignore
    getData: ({newLimit, newOffset}?: { newLimit?: number | undefined, newOffset?: number | undefined }) => Promise<any>,
    getDone: boolean,
    isRendering: boolean,
    dependencies?: Array<any>
}

function useGetPaginatedData(props: useGetPaginatedDataProps) {
    const {offset, getData, getDone, isRendering, dependencies} = props
    const [getMoreLoading, setGetMoreLoading, getMoreLoadingRef] = useSyncedState(false)
    const cancelToken = useRef<AbortController>(null)
    const shouldInitialGet = offset === null || offset === undefined
    const [notFound, setNotFound] = useState(false)
    const [has500Err, setHas500Err] = useState(false)
    const lastOffsetRef = useRef(offset)

    useEffectJustChanges(() => {
        if (lastOffsetRef.current && lastOffsetRef.current - 1 === offset) {
            getData({newLimit: 1, newOffset: offset})
        }
        lastOffsetRef.current = offset
    }, [...(dependencies || []), offset])

    const getMore = useCallback(() => {
        if (isRendering && !shouldInitialGet && !getMoreLoadingRef.current && !getDone) {
            setGetMoreLoading(true)
            getData()
                ?.catch?.(err => {
                setNotFound(err?.status === 404)
                setHas500Err(err?.status === 500)
            })
                ?.finally?.(() => {
                setTimeout(() => {
                    setGetMoreLoading(false)
                }, 100)
            })
        }
        // eslint-disable-next-line
    }, [...(dependencies || []), isRendering, offset, getDone])

    useEffect(() => {
        if (isRendering && shouldInitialGet && !getDone) {
            getData()?.catch?.(err => {
                setNotFound(err?.status === 404)
                setHas500Err(err?.status === 500)
            })
        }
        // eslint-disable-next-line
    }, [...(dependencies || []), isRendering, offset, getDone])

    useEffect(() => {
        return () => {
            // eslint-disable-next-line
            cancelToken?.current?.abort?.("CANCEL")
        }
        // eslint-disable-next-line
    }, [...(dependencies || []), isRendering])

    return {
        isLoading: (shouldInitialGet || getMoreLoading) && !notFound,
        cancelToken,
        getMore,
        notFound,
        has500Err,
    }
}

export default useGetPaginatedData
