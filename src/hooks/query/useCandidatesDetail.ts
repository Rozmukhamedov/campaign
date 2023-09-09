import {useQuery} from "react-query";
import {request} from "services/api";

export const useCandidatesDetailQuery = ({id, enabled }: {id: number, enabled: boolean}) => {
    return useQuery(["use-get-all-candidat-detail", id], async () => {
        const {data} = await request.get(`/candidates/${id}`);
        return data;
    },
    {
        enabled: enabled,
    });
};
