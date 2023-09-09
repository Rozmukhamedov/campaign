import {useMutation} from "react-query";
import {request} from "services/api";

export const useEventsCompletelyDeleted = () => {
    return useMutation((data: any) => request.patch(`/election/events/complete/delete/`, data));
};
