import {useMutation} from "react-query";
import {request} from "services/api";

export const useCreateVoterMutation = () => {
    return useMutation((data: any) => request.post(`/voters/`, data, {
        headers: {"Content-Type": "multipart/form-data; boundary=---WebKitFormBoundary7MA4YWxkTrZu0gW"}
    }));
};
