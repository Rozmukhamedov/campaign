import {useMutation} from "react-query";
import {request} from "services/api";

export const useNoteUpdateById = () => {
    return useMutation(({data, id}: any) => request.patch(`/election/note/update/${id}/`, data));
};
