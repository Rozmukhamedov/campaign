import {useMutation} from "react-query";
import {request} from "services/api";

export const useElectionNoteDeleteById = () => {
    return useMutation((id: any) => request.delete(`/election/note/delete/${id}/`));
};
