import "./style.css";
import { useState } from "react";
import AddCandtItems from "./AddCandtItems";
import { Button, Input } from "@mantine/core";
import { queryClient } from "services/accountAPI";
import { useDebouncedState } from "@mantine/hooks";
import CloseIcon from "assets/images/closeicon.svg";
import { useGetCandidatVotersList } from "hooks/query";
import { useCreateVotersInCandidate } from "hooks/mutation";
import { useElectionContext } from "context/ElectionContext";
import { ReactComponent as SearchIcon } from "../../../assets/images/search.svg";
import useInfiniteQueryForScroll from "hooks/custom/useInfiniteQueryForScroll";

type AddCandidateVotersProps = {
  setCandidateVoters: React.Dispatch<React.SetStateAction<string>>;
  candidateid: number;
  voterfirstname: string;
  voterlastname: string;
  voters: string;
};

const AddCandidateVoters: React.FC<AddCandidateVotersProps> = ({
  setCandidateVoters,
  candidateid,
  voterfirstname,
  voterlastname,
  voters,
}) => {
  const createVoters = useCreateVotersInCandidate();
  const [checked, setChecked] = useState<number[]>([]);
  const [value, setValue] = useDebouncedState("", 200);
  const { electionId } = useElectionContext();

  const params = {
    voter: value,
    election: electionId,
  };
  const condidateListNode = document.querySelector("#condidate__list");
  const { data, refetch, isLoading } = useInfiniteQueryForScroll(
    "/candidates/voter/for/candidate/list",
    condidateListNode,
    params
  );

  const useGetVoterCandidatesList = useGetCandidatVotersList({
    voter: value,
    election: electionId,
  });

  const createCandidant = () => {
    const data = {
      election: electionId,
      candidate: candidateid,
      voter: checked,
    };
    const createCandidates = createVoters.mutateAsync(data);

    createCandidates
      .then((res) => {
        useGetVoterCandidatesList.refetch();
        queryClient.refetchQueries("use-get-all-candidates");
        queryClient.refetchQueries("use-get-election-query-by-id");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  return (
    <div className="candidatevoters">
      <div className="candidatevoter__top">
        <h2>
          {voterfirstname} {voterlastname}
        </h2>
        <img
          onClick={() => setCandidateVoters("")}
          src={CloseIcon}
          alt="CloseIcon"
        />
      </div>
      <div className="cand__voters">
        <p>
          {voters} <span>voters</span>
        </p>
      </div>
      <div className="addcandidate__form">
        <Input
          onChange={(event: any) => setValue(event.target.value)}
          icon={<SearchIcon />}
          variant="filled"
          placeholder="Search"
          radius="lg"
        />
        <Button
          onClick={createCandidant}
          radius="lg"
          className="candidatevoters__btn-add"
        >
          Add
        </Button>
      </div>

      <div id="condidate__list" className="candidatevoters__list">
        {!isLoading ? (
          data?.pages.map((page: any) => {
            return page?.data?.results?.map((item: any) => {
              return (
                <AddCandtItems
                  checked={checked}
                  setChecked={setChecked}
                  items={item}
                  key={item.id}
                />
              );
            });
          })
        ) : (
          <p className="noresult">The requested voter was not found </p>
        )}
      </div>
    </div>
  );
};


export default AddCandidateVoters;
