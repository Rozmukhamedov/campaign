import {useQuery} from "react-query";
import {request} from "services/api";

export const useGetEventById = (id: number) => {
    return useQuery(["/election/event/retrieve/", id], async () => {
        const {data} = await request.get(`/election/event/retrieve/${id}`);
        return data;
    });
};