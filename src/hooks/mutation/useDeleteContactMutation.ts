import {useMutation} from "react-query";
import {request} from "services/api";

export const useDeleteContactMutation = () => {
    return useMutation((id: number) => request.delete(`/election/sponsors/${id}/`));
};
