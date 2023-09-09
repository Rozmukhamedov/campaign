import {useQuery} from "react-query";
import {request} from "services/api";

export const useGetElectionById = (id: number, enabled: boolean) => {
    return useQuery(["use-get-election-query-by-id", id], async () => {
        const {data} = await request.get(`/election/retrieve/${id}`);
        return data;
    }, {enabled: enabled});
};