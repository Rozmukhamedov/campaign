import {useMutation} from "react-query";
import {request} from "services/api";

export const useTeamAddPersonEventTeam = () => {
    return useMutation(({data}: any) => request.post(`/add/person/in/event/team/`, data));
};
