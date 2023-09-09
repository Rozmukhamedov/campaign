import {useMutation} from "react-query";
import {request} from "services/api";

export const useDeleteEventMutation = () => {
    return useMutation((data: any) => request.patch(`/election/events/delete/`, data));
};
