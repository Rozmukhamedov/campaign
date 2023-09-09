import {useQuery} from "react-query";
import {request} from "services/api";

export const useGetVoterQuery = ({
                                     id,
                                     enabled,
                                 }: {
    id: any;
    enabled?: boolean;
}) => {
    return useQuery(
        ["use-get-voter", id],
        async () => {
            const {data} = await request.get(`/voters/${id}`);
            return data;
        },
        {enabled: enabled}
    );
};
