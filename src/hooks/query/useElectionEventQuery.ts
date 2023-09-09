import {useQuery} from "react-query";
import {request} from "services/api";

export const useElectionEventQuery = (electionId: number) => {
    return useQuery(["use-get-all-event-query", electionId], async () => {
        const {data} = await request.get(`/election/event/`, {params: {election: electionId}});
        return data;
    });
};