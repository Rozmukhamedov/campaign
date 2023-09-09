import {useMutation} from "react-query";
import {request} from "services/api";

export const useDeleteEventTeamMutation = () => {
    return useMutation((data: any) => request.post(`/remove/person/in/event/team/`, data));
};
