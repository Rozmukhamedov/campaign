import {useMutation} from "react-query";
import {request} from "services/api";

export const useVotersComment = () => {
    return useMutation(({data, voter_id}: any) => request.patch(`/voters/comment/`, data, {params: {voter_id}}));
};


