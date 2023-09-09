import {useQuery} from "react-query";
import {request} from "services/api";

export const useGetTeamPersonsList = ({
                                          event,
                                          enabled,
                                      }: {
    event: any;
    enabled?: boolean;
}) => {
    return useQuery(
        ["use-get-team-by-person-event", event],
        async () => {
            const {data} = await request.get(`/team/persons/list/`, {params: {event}});
            return data;
        },
        {enabled: enabled}
    );
};
