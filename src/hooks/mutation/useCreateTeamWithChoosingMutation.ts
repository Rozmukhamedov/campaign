import {useMutation} from "react-query";
import {request} from "services/api";

export const useCreateTeamWithChoosingMutation = () => {
    return useMutation((data: any) => request.post(`/team/choose/create/`, data));
};
