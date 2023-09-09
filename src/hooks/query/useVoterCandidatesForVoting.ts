import {useQuery} from "react-query";
import {request} from "services/api";

export const useVoterCandidatesForVoting = ({
                                                page,
                                                voter_id,
                                                election
                                            }: { page: number, voter_id: any, election: number }) => {
    return useQuery(
        ["/voters/candidates/for/voting/", page, voter_id, election],
        async () => {
            const {data} = await request.get(`/voters/candidates/for/voting/`, {params: {page, voter_id, election}});
            return data;
        }
    );
};
