import {useMutation} from "react-query";
import {request} from "services/api";

export const useUpdateTeamById = () => {
    return useMutation(({data, id}: any) => request.patch(`/team/retrieve/update/${id}/`, data));
};
