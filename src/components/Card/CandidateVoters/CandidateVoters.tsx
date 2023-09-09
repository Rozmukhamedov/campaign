import "./style.css";
import { Input, Button } from "@mantine/core";
import { ReactComponent as SearchIcon } from "../../../assets/images/search.svg";
import CloseIcon from "assets/images/closeicon.svg";
import CandidatevoterItem from "./CandidatevoterItem/CandidatevoterItem";
import { useGetVoterCandidates } from "hooks/query";
import { useState } from "react";
import { useStatesPopup } from "context/MainStatesContext";
import { useDeleteVoterForCandidate } from "hooks/mutation";
import { useDebouncedState } from "@mantine/hooks";
import { Loader } from "@mantine/core";
import { queryClient } from "../../../services/accountAPI";
type CandidateVotersProps = {
  setCandidateVoters: any;
  candidateid: any;
  voters: any;
  voterfirstname: string;
  voterlastname: string;
  candidateVoters: any;
};
const CandidateVoters: React.FC<CandidateVotersProps> = ({
  setCandidateVoters,
  candidateid,
  voters,
  voterfirstname,
  voterlastname,
  candidateVoters,
}) => {
  const [value, setValue] = useDebouncedState("", 1000);
  const useGetVoterCandidatesList = useGetVoterCandidates({
    candidate: candidateid,
    query: value,
  });

  const [showChecked, setShowChecked] = useState(false);
  const [deleteVotersId, setDeleteVotersId] = useState<number[]>([]);

  const DeleteVoterForCandidates = useDeleteVoterForCandidate();
  const { refreshCandidates, setRefreshCandidates } = useStatesPopup();

  const filterDeleteVoter = (id: number) => {
    let result = deleteVotersId.filter((deleteVoterId) => deleteVoterId == id);
    if (!result.length) return setDeleteVotersId([...deleteVotersId, id]);
    let resultArray = deleteVotersId.filter(
      (deleteVoterId) => deleteVoterId == id
    );
    setDeleteVotersId([...resultArray]);
  };

  const deleteVoterFunc = () => {
    const deleteVoters = DeleteVoterForCandidates.mutateAsync({
      id: deleteVotersId,
    });
    deleteVoters
      .then((res) => {
        useGetVoterCandidatesList.refetch();
        if (showChecked == false) {
          setShowChecked(true);
        } else {
          setRefreshCandidates(refreshCandidates + 1);
        }
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
        <p
          onClick={() => {
            setCandidateVoters("");
            candidateVoters === "cand" && setCandidateVoters("");
          }}
        >
          {voters} <span>voters </span>
        </p>
      </div>
      <div className="candidatevoters__form">
        <Input
          onChange={(event: any) => setValue(event.target.value)}
          icon={<SearchIcon />}
          variant="filled"
          placeholder="Search"
          radius="lg"
        />
        <Button
          onClick={deleteVoterFunc}
          radius="lg"
          className="candidatevoters__btn-delete"
        >
          Delete
        </Button>
      </div>
      {useGetVoterCandidatesList.isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          <Loader size="lg" />
        </div>
      ) : useGetVoterCandidatesList.data?.results == 0 ? (
        <p className="noresult">There are no voters available</p>
      ) : (
        <div className="candidatevoters__list">
          <>
            {useGetVoterCandidatesList.data?.results?.some(
              (item: any) => item.voter.status === "vip"
            ) && (
              <div className="candivoteritem__top-line">
                <p>100%</p>
                <div className="candvot__vip-line"></div>
              </div>
            )}
            {useGetVoterCandidatesList.data?.results.map(
              (item: any, index: number) =>
                item.voter.status == "vip" && (
                  <CandidatevoterItem
                    showChecked={showChecked}
                    setShowChecked={setShowChecked}
                    item={item}
                    key={index}
                    deleteVoters={filterDeleteVoter}
                  />
                )
            )}
          </>
          <>
            {useGetVoterCandidatesList.data?.results?.some(
              (item: any) => item.voter.status === "gold"
            ) && (
              <div className="candivoteritem__top-line">
                <p>75%</p>
                <div className="candvot__gold-line"></div>
              </div>
            )}
            {useGetVoterCandidatesList.data?.results.map(
              (item: any, index: number) =>
                item.voter.status == "gold" && (
                  <CandidatevoterItem
                    showChecked={showChecked}
                    setShowChecked={setShowChecked}
                    item={item}
                    key={index}
                    deleteVoters={filterDeleteVoter}
                  />
                )
            )}
          </>
          <>
            {useGetVoterCandidatesList.data?.results?.some(
              (item: any) => item.voter.status === "bronze"
            ) && (
              <div className="candivoteritem__top-line">
                <p>50%</p>
                <div className="candvot__bronze-line"></div>
              </div>
            )}
            {useGetVoterCandidatesList.data?.results.map(
              (item: any, index: number) =>
                item.voter.status === "bronze" && (
                  <CandidatevoterItem
                    showChecked={showChecked}
                    setShowChecked={setShowChecked}
                    item={item}
                    key={index}
                    deleteVoters={filterDeleteVoter}
                  />
                )
            )}
          </>
          <>
            {useGetVoterCandidatesList.data?.results?.some(
              (item: any) => item.voter.status === "silver"
            ) && (
              <div className="candivoteritem__top-line">
                <p>25%</p>
                <div className="candvot__silver-line"></div>
              </div>
            )}
            {useGetVoterCandidatesList.data?.results.map(
              (item: any, index: number) =>
                item.voter.status == "silver" && (
                  <CandidatevoterItem
                    showChecked={showChecked}
                    setShowChecked={setShowChecked}
                    item={item}
                    key={index}
                    deleteVoters={filterDeleteVoter}
                  />
                )
            )}
          </>
        </div>
      )}
    </div>
  );
};

export default CandidateVoters;
