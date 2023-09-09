import {useMutation} from "react-query";
import {request} from "services/api";

export const useElectionGuestCreate = () => {
    return useMutation(({data}: any) => request.post(`/election/event/guests/create/`, data));
};


