import {useQuery} from "react-query";
import {request} from "services/api";

export const useVoterGetIdQuery = ({id}: { id: number }) => {
    return useQuery(["use-get-voter-by-id", id], async () => {
        const {data} = await request.get(`/voters/${id}`);
        return data;
    });
};
