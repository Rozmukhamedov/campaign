import React, { useEffect, useState } from "react";
import "./style.css";
import phone from "assets/images/phone.svg";
import { Button, Input, Textarea } from "@mantine/core";
import facebook from "assets/images/facebook.svg";
import telegram from "assets/images/telegram.svg";
import instagram from "assets/images/instagram.svg";
import { useGetVoterQuery } from "hooks/query";
import backIcon from "assets/images/backicon.svg";
import { useLocation } from "react-router-dom";
import qs from "qs";
import Skeleton from "components/Skeleton";
import { useElectionContext } from "context/ElectionContext";
import toast from "react-hot-toast";
import { useVoterCandidatesForVoting } from "hooks/query/useVoterCandidatesForVoting";
import { FaCheckCircle } from "react-icons/fa";
import { useEditVoterMutation } from "hooks/mutation";
import IMG from "assets/images/default_user.png";
import { queryClient } from "../../../../services/accountAPI";
import { FaUserClock } from "react-icons/fa";

type VoterDetailsProps = {
  setOpenGrid: boolean | any;
};
const VoterDetails: React.FC<VoterDetailsProps> = ({ setOpenGrid }) => {
  const { search } = useLocation();
  const [comments, setComments] = useState<{
    comment?: string;
    invite_people?: number;
  }>({});
  const { electionId } = useElectionContext();
  const query = qs.parse(search, { ignoreQueryPrefix: true });
  const useGetVoter = useGetVoterQuery({ id: query?.voterId });
  const votersCommentMutation = useEditVoterMutation();
  const [candidateId, setCandidateId] = useState(-1);

  useEffect(() => {
    setCandidateId(useGetVoter?.data?.candidate?.id);
  }, [useGetVoter?.isSuccess]);

  const voterCandidatesForVoting = useVoterCandidatesForVoting({
    page: 1,
    voter_id: query?.voterId,
    election: electionId,
  });

  const handleSaveComments = () => {
    const votersComment = votersCommentMutation.mutateAsync({
      data: {
        comment: comments?.comment,
        invite_people: comments?.invite_people,
        voting_for: candidateId,
      },
      id: Number(query?.voterId),
    });
    votersComment
      .then(() => {
        toast.success("Successfully changed");
        useGetVoter.refetch();
        queryClient.refetchQueries("use-get-election-query-by-id");
      })
      .catch(() => {
        toast.error("Changing error");
      });
  };

  if (useGetVoter?.isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="voterdetails__wrapper">
      <div className="voterdetails__top">
        <img src={backIcon} onClick={setOpenGrid} />
        <button
          onClick={() => {
            setOpenGrid("editvoter");
          }}
        >
          Edit
        </button>
      </div>
      <div className="voterdetails__info">
        <div className="voterdetails__soc-info">
          <h2>
            {useGetVoter.data?.first_name} {useGetVoter.data?.last_name}
          </h2>
          <p>{useGetVoter.data?.organization}</p>
          <div className="voterdetails__socicons">
            <a href={"tel:" + useGetVoter.data?.social_contacts?.phone_number}>
              <img src={phone} />
            </a>
            <a
              href={
                "https://www.facebook.com/" +
                useGetVoter.data?.social_contacts?.facebook
              }
            >
              <img src={facebook} />
            </a>
            <a
              href={
                "https://t.me/" + useGetVoter.data?.social_contacts?.telegram
              }
            >
              <img src={telegram} />
            </a>
            <a
              href={
                "https://www.instagram.com/" +
                useGetVoter.data?.social_contacts?.instagram
              }
            >
              <img src={instagram} />
            </a>
          </div>
        </div>
        <div className="voterdetails__img-profile">
          <img
            src={!!useGetVoter.data?.image ? useGetVoter.data?.image : IMG}
          />
        </div>
      </div>
      <div className="voterdetails__voting">
        <h3>Voting For</h3>
        <div className="voting_for_img_container">
          {voterCandidatesForVoting?.data?.results?.map(
            (item: any, index: number) => {
              return (
                <div className="voting_for_img" key={index}>
                  <img
                    onClick={() => setCandidateId(item?.id)}
                    src={!!item?.image ? item?.image : IMG}
                    alt="profile-img"
                  />
                  {candidateId === item?.id && (
                    <div className="voting_for_img_check_icon">
                      <FaCheckCircle />
                    </div>
                  )}
                </div>
              );
            }
          )}
          <div className="voting_for_img" onClick={() => setCandidateId(0)} >
           <FaUserClock className="voting__icon"/>
           <p>Undecided</p>
            {candidateId == 0 && (
              <div className="voting_for_img_check_icon">
                <FaCheckCircle />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="voterdetails__comments">
        <p>Comments</p>
        <Textarea
          defaultValue={useGetVoter?.data?.comment}
          onChange={(e) =>
            setComments((prevState) => ({
              ...prevState,
              comment: e.target?.value,
            }))
          }
        />
      </div>
      <div className="voterdetails__invite">
        <p>Invite people</p>
        <Input
          type="number"
          defaultValue={useGetVoter?.data?.invite_people}
          onChange={(e: any) =>
            setComments((prevState) => ({
              ...prevState,
              invite_people: e?.target?.value,
            }))
          }
        />
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            marginLeft: "auto",
          }}
        >
          <Button onClick={handleSaveComments} style={{ padding: "5px 15px" }}>
            Save
          </Button>
        </div>
      </div>

      {voterCandidatesForVoting?.data?.results?.some(
        (item: any) => item?.votering
      ) && (
        <div className="voterdetails__bottom-info">
          <p>Result</p>
          <div className="voterdetails__result">
            <h3>
              {
                voterCandidatesForVoting?.data?.results?.find(
                  (item: any) => item?.votering === true
                )?.first_name
              }{" "}
              {
                voterCandidatesForVoting?.data?.results?.find(
                  (item: any) => item?.votering === true
                )?.last_name
              }
            </h3>
            {/*<p>{useGetVoter.data?.candidate?.predictions}</p>*/}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoterDetails;
