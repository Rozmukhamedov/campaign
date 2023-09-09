import {useEffect} from "react";
import {useInfiniteQuery} from "react-query";
import {request} from "services/api";


export default function useInfiniteQueryForScroll(url: string, scrollId: any, params: Object) {
    const {data, hasNextPage, isLoading, refetch, fetchNextPage} = useInfiniteQuery(
        [url, params],
        async ({pageParam = 1}) => await request.get(url, {params: {page: pageParam, ...params}}),
        {
            getNextPageParam: (lastPage: any, allPages) => {
                const totalPages = Math.ceil(lastPage.data.count / 10);
                const nextPage = allPages.length + 1;
                return nextPage <= totalPages ? nextPage : undefined;
            },
            getPreviousPageParam: (firstPage, allPages) => {
                const previousPage = allPages.length !== 0 ? allPages.length - 1 : 0;
                return previousPage <= firstPage.length ? previousPage : undefined
            },
        }
    );
    useEffect(() => {
        let fetching = false;
        const onScroll = async (event: any) => {
            const {scrollHeight, scrollTop, clientHeight} = event.target;
            if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
                fetching = true;
                if (hasNextPage) await fetchNextPage();
                fetching = false;
            }
        };

        scrollId?.addEventListener("scroll", onScroll);
        return () => {
            scrollId?.removeEventListener("scroll", onScroll);
        };
    }, [scrollId]);

    return {data, isLoading, refetch}
}