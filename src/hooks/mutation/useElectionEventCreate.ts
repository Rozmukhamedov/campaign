import {useMutation} from "react-query";
import {request} from "services/api";

export const useElectionEventCreate = () => {
    return useMutation((data: any) => request.post(`/election/event/create/`, data));
};
