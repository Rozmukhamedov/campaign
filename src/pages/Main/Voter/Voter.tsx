import "./style.css";
import VoterItem from "./VoterItem";
import { Input } from "@mantine/core";
import React, { useState } from "react";
import { useVotersQuery } from "hooks/query";
import { useDeleteVotersMutation } from "hooks/mutation";
import closeIcon from "assets/images/closeicon.svg";
import { ReactComponent as SearchIcon } from "assets/images/search.svg";
import { useElectionContext } from "context/ElectionContext";
import Skeleton from "components/Skeleton";
import useDebounce from "hooks/custom/useDebounce";
import useInfiniteQueryForScroll from "hooks/custom/useInfiniteQueryForScroll";
import { FaUserCheck, FaUserClock, FaUserMinus } from "react-icons/fa";

type VoterProps = {
  setOpenGrid: boolean | any;
};

const voterStatus = [
  {
    title: "100%",
    params: "vip",
    color: "#000000",
  },
  {
    title: "75%",
    params: "gold",
    color: "#FBC22E",
  },
  {
    title: "50%",
    params: "bronze",
    color: "#AF713F",
  },
  {
    title: "25%",
    params: "silver",
    color: "#7E7E7E",
  },
  {
    title: "All",
    params: "",
    color: "#1B54FB",
  },
];
const votedStatus = [
  {
    title: "For me",
    icon: <FaUserCheck />,
    color: "#00FF00",
    value: "green",
  },
  {
    title: "Against me",
    icon: <FaUserMinus />,
    color: "#FF0000",
    value: "red",
  },
  {
    title: "Undecided",
    icon: <FaUserClock />,
    color: "#808080",
    value: "gray",
  },
  {
    title: "All",
    icon: "",
    color: "#1B54FB",
    value: "",
  },
];

const Voter: React.FC<VoterProps> = ({ setOpenGrid }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [isHovering, setIsHovering] = useState({
    votedStatus: -1,
    voterStatus: -1,
  });
  const [votedStatusFilters, setVotedFiltersStatus] = useState("");
  const { electionId } = useElectionContext();
  const [statusState, setStatusState] = useState("");
  const [deleteVotersId, setDeleteVotersId] = useState([0]);
  const useDeleteVoters = useDeleteVotersMutation();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  const handleSearchInput = (e: any) => {
    setValue(e?.target?.value);
  };
  const params = {
    election: electionId,
    status: statusState,
    query: debouncedValue,
    color: votedStatusFilters,
  };

  const voterNode = document.querySelector("#voter");

  const { data, refetch, isLoading } = useInfiniteQueryForScroll(
    "/voters/",
    voterNode,
    params
  );

  const filterDeleteVoter = (id: number) => {
    let result = deleteVotersId.filter((deleteVoterId) => deleteVoterId == id);
    if (!result.length) return setDeleteVotersId([...deleteVotersId, id]);
    let resultArray = deleteVotersId.filter(
      (deleteVoterId) => deleteVoterId !== id
    );
    setDeleteVotersId([...resultArray]);
  };

  const deleteVoterFunc = () => {
    const deleteVoters = useDeleteVoters.mutateAsync({ id: deleteVotersId });
    deleteVoters
      .then((res) => {
        setShowDelete(false);
        refetch();
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  return (
    <div className="voter">
      <div className="vooter__top">
        <h1>Voters</h1>
        <div className="vooter__btns">
          <button
            onClick={() => {
              setOpenGrid("voteradd");
            }}
            className={`${showDelete ? "voterbtn__hidden" : "vooter_btn-add"}`}
          >
            Add
          </button>
          <button
            onClick={() => {
              setShowDelete(true);
              setOpenGrid("");
            }}
            className={`${
              showDelete ? "vooter_btn-delete-hidden" : "vooter_btn-delete"
            }`}
          >
            Delete
          </button>
          {showDelete && (
            <img
              onClick={() => setShowDelete(false)}
              src={closeIcon}
              alt="Close"
            />
          )}
        </div>
      </div>
      <div
        className={`${showDelete ? "vooter__input-delete" : "vooter__input"}`}
      >
        <Input
          icon={<SearchIcon />}
          variant="filled"
          placeholder="Search"
          value={value}
          onChange={handleSearchInput}
          radius="lg"
        />
        {showDelete && (
          <button onClick={deleteVoterFunc} className="vooter_btn-delete">
            Delete
          </button>
        )}
      </div>
      <div className="vooter__filter-btns">
        {voterStatus.map((status, index) => (
          <button
            key={index}
            onClick={() => {
              setStatusState(status.params);
              setDeleteVotersId([0]);
              setOpenGrid("");
            }}
            onMouseEnter={() =>
              setIsHovering((prevState) => ({
                ...prevState,
                voterStatus: index,
              }))
            }
            onMouseLeave={() =>
              setIsHovering((prevState) => ({ ...prevState, voterStatus: -1 }))
            }
            style={
              status.params === statusState || isHovering.voterStatus === index
                ? {
                    backgroundColor: status.color,
                    color: "#fff",
                  }
                : {}
            }
          >
            {status.title}
          </button>
        ))}
      </div>
      <div className="vooter__filter-btns filtered_colors">
        {votedStatus.map(({ title, icon, color, value }, index) => (
          <button
            key={index}
            className="filter_btn_colors"
            onClick={() => {
              setDeleteVotersId([0]);
              setOpenGrid("");
              setVotedFiltersStatus(value);
            }}
            onMouseEnter={() =>
              setIsHovering((prevState) => ({
                ...prevState,
                votedStatus: index,
              }))
            }
            onMouseLeave={() =>
              setIsHovering((prevState) => ({ ...prevState, votedStatus: -1 }))
            }
            style={
              value === votedStatusFilters || isHovering?.votedStatus === index
                ? {
                    backgroundColor: color,
                    color: "#fff",
                  }
                : {}
            }
          >
            {icon !== "" && <span style={{ marginRight: 5 }}>{icon}</span>}
            {title}
          </button>
        ))}
      </div>
      <div id="voter" className="vooter__scrollbar">
        {!isLoading ? (
          data?.pages?.map((page) => {
            return page?.data?.results?.map((item: any, index: number) => {
              return (
                <VoterItem
                  item={item}
                  key={index}
                  setOpenGrid={setOpenGrid}
                  showDelete={showDelete}
                  deleteVoters={filterDeleteVoter}
                />
              );
            });
          })
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
};

export default Voter;
