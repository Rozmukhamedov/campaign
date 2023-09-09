import {useQuery} from "react-query";
import {request} from "services/api";

export const useGetTeamQuery = ({page, election}: { page: number, election: number }) => {
    return useQuery(["use-get-team-query", page, election], async () => {
        const {data} = await request.get(`/team/`, {
            params: {page, election}
        });
        return data;
    });
};
