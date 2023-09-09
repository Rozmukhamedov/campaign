import {useMutation} from "react-query";
import {request} from "services/api";

export const useDeleteEventGuestMutation = () => {
    return useMutation((data: any) => request.patch(`/election/event/guests/delete/`, data));
};
