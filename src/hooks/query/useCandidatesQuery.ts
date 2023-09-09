import {useQuery} from "react-query";
import {request} from "services/api";

export const useCandidatesQuery = ({page, election}: { page: number, election: number }) => {
    return useQuery(["use-get-all-candidates", page], async () => {
        const {data} = await request.get(`/candidates/`, {
            params: {page, election}
        });
        return data;
    });
};
