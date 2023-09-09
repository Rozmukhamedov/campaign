import {useQuery} from "react-query";
import {request} from "services/api";

export const useElectionEventStatistics = (id: number) => {
    return useQuery(["/election/events/statistic/", id], async () => {
        const {data} = await request.get(`/election/events/statistic/${id}/`);
        return data;
    });
};