import {useQuery} from "react-query";
import {request} from "services/api";

export const useGetTeamById = ({
                                   id,
                                   enabled,
                               }: {
    id: any;
    enabled?: boolean;
}) => {
    return useQuery(
        ["use-get-team-by-id", id],
        async () => {
            const {data} = await request.get(`/team/${id}`);
            return data;
        },
        {enabled: enabled}
    );
};
