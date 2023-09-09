import {useCallback, useRef} from 'react';

type observeRefType = {
    loading: boolean;
    setPageNumber: any;
    hasMore: boolean
}

//useObserveRef hook only use with useInfinite, because these hooks props relative to each other

export const useObserverRef = ({loading, setPageNumber, hasMore}: observeRefType) => {
    const observer: any = useRef();
    const lastResultElementRef = useCallback((node: any) => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber((prevPageNumber: number) => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    return lastResultElementRef;
};
