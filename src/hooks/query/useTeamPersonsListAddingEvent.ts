import {useQuery} from "react-query";
import {request} from "services/api";

export const useTeamPersonsListAddingEvent = ({
                                                  event,
                                                  page,
                                                  enabled,
                                                  electionId
                                              }: {
    event: string | null;
    electionId: number
    enabled?: boolean;
    page: number
}) => {
    return useQuery(
        ["team-persons-list-for-adding-event", event],
        async () => {
            const {data} = await request.get(`/team/persons/list/for/adding/event/`, {
                params: {
                    page,
                    event,
                    election: electionId
                }
            });
            return data;
        },
        {enabled: enabled}
    );
};
