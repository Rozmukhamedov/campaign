import {useQuery} from "react-query";
import {request} from "services/api";

export const useElectionNotesRetrieveId = (id: number, enabled: boolean) => {
    return useQuery(["/election/note/retrieve/id", id], async () => {
        const {data} = await request.get(`/election/note/retrieve/${id}/`);
        return data;
    }, {enabled: enabled});
};