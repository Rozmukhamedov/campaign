import {useQuery} from "react-query";
import {request} from "services/api";

export const useGetCandidatVotersList = ({voter,election}:{voter:string, election: number}) => {
    return useQuery(["use-get-candidates-voters",voter], async () => {
        const {data} = await request.get(`/candidates/voter/for/candidate/list`, { 
            params:{voter,election}
        });
        return data;
    });
};

