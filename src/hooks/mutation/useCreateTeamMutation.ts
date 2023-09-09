import {useMutation} from "react-query";
import {request} from "services/api";



export const useCreateTeamMutation = () => {
    return useMutation((data: any) => request.post(`/team/create/`, data, {
        headers: {"Content-Type": "multipart/form-data; boundary=---WebKitFormBoundary7MA4YWxkTrZu0gW"}
    }));
};
