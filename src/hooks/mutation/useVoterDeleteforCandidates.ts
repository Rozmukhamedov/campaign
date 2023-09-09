import {useMutation} from "react-query";
import {request} from "services/api";

export const useVoterDeleteforCandidates = () => {
    return useMutation(() => request.delete(`/candidates/voter/for/candidate/delete/`));
};
