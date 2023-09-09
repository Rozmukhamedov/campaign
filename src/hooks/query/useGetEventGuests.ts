import {useQuery} from "react-query";
import {request} from "services/api";

export const useGetEventGuests = ({
                                      page,
                                      event
                                  }: {
    page: number;
    event: number;
}) => {
    return useQuery(["use-get-guest-list", page, event], async () => {
        const {data} = await request.get(`/election/event/guests/list/`, {
            params: {page, event},
        });
        return data;
    });
};
