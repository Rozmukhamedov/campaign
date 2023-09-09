import {useMutation} from "react-query";
import {request} from "services/api";

export const useNoteCreate = () => {
    return useMutation((data: any) =>
        request.post(`/election/note/create/`, data)
    );
};
