import "./style.css";
import {useState, useEffect} from "react";
import Team from "./Team/Team";
import Voter from "./Voter/Voter";
import Event from "./Event/Event";
import Budgeting from "./Budgeting/Budgeting";
import CustomTable from "components/Table/Table";
import Candidates from "./Candidates/Candidates";
import {Container, SimpleGrid} from "@mantine/core";
import SliderStatistic from "components/SliderStatistic/SliderStatistic";
import OutlineSlider from "components/OutlineSlider/OutlineSlider";
import VoterDetails from "./Voter/VoterDetails/VoterDetails";
import Notes from "./Notes/Notes";
import VoterAdd from "./Voter/VoterAdd/VoterAdd";
import VoterEdit from "./Voter/VoterEdit/VoterEdit";
import EditSocmedia from "./Voter/VoterEdit/Edit-Socmedia/EditSocmedia";
import VoterSocMedia from "./Voter/VoterAdd/VoterAdd-SocMedia/VoterSocMedia";

import {useAccountPopup} from "context/AccountPopupContext";
import AddTeam from "./Team/AddTeam/AddTeam";
import TeamDetails from "./Team/TeamDetails/TeamDetails";
import {motion} from "framer-motion";
import Candidateinfo from "./Candidates/Candidate-info";
import EditTeamMembers from "./Team/EditTeamMembers";
import {useLocation, useNavigate} from "react-router-dom";

const MainPage = () => {
    const [openGrid, setOpenGrid] = useState("");
    const [changeTeam, setChangeTeam] = useState("team");
    const {handleMouseOver, handleMouseOut} = useAccountPopup();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === "/" && !localStorage.getItem("election_title")) {
            navigate("/election", {replace: true});
        }
    }, []);

    return (
        <>
            <motion.div
                initial={{y: "100%"}}
                animate={{y: 0, transition: {duration: 0.5}}}
                className="main"
            >
                <Container size="xl">
                    <div style={{padding: "10px 0"}}>
                        <OutlineSlider/>
                    </div>
                    <SimpleGrid cols={3} spacing="lg">
                        {openGrid !== "team" &&
                        openGrid !== "team_detail" &&
                        openGrid !== "edit-team" ? (
                            <Voter setOpenGrid={setOpenGrid}/>
                        ) : null}
                        {openGrid === "voterdetails" ? (
                            <VoterDetails setOpenGrid={setOpenGrid}/>
                        ) : openGrid === "voteradd" ? (
                            <VoterAdd setOpenGrid={setOpenGrid}/>
                        ) : openGrid === "addvoter-socmedia" ? (
                            <VoterSocMedia setOpenGrid={setOpenGrid}/>
                        ) : openGrid === "editvoter" ? (
                            <VoterEdit setOpenGrid={setOpenGrid}/>
                        ) : openGrid === "editvoter-socmedia" ? (
                            <EditSocmedia setOpenGrid={setOpenGrid}/>
                        ) : null}
                        <SimpleGrid cols={1} spacing="lg">
                            <Event/>
                            <Budgeting/>
                        </SimpleGrid>
                        {openGrid !== "voter" &&
                        openGrid !== "voteradd" &&
                        openGrid !== "teamdetails" &&
                        openGrid !== "voterdetails" &&
                        openGrid !== "voteradd" &&
                        openGrid !== "addvoter-socmedia" &&
                        openGrid !== "editvoter" &&
                        openGrid !== "editvoter-socmedia" ? (
                            <SimpleGrid cols={1} spacing="lg" className="tt">
                                <div>
                                    {changeTeam == "team" ? (
                                        <div>
                                            <div
                                                className="notehover"
                                                onMouseOver={handleMouseOver}
                                                onMouseOut={handleMouseOut}
                                            >
                                                <Team
                                                    setChangeTeam={setChangeTeam}
                                                    setOpenGrid={setOpenGrid}
                                                />
                                            </div>
                                            <div>
                                                <Notes/>
                                            </div>
                                        </div>
                                    ) : changeTeam === "addteam" ? (
                                        <AddTeam setChangeTeam={setChangeTeam}/>
                                    ) : null}
                                </div>
                            </SimpleGrid>
                        ) : null}
                        {openGrid === "team_detail" ? (
                            <TeamDetails setOpenGrid={setOpenGrid}/>
                        ) : openGrid === "edit-team" ? (
                            <EditTeamMembers
                                setOpenGrid={setOpenGrid}
                                setChangeTeam={setChangeTeam}
                            />
                        ) : null}
                    </SimpleGrid>
                </Container>

                <Candidates/>

                {/* {CandidatesList.isLoading ? (
        <Loader />
      ) : (
        <Candidates CandidatesList={CandidatesList} />
      )} */}
                <SliderStatistic/>

                <div className="table-container">
                    <Container size="xl">
                        <CustomTable verticalSpacing={"md"}/>
                    </Container>
                </div>
            </motion.div>
            <Candidateinfo/>
        </>
    );
};

export default MainPage;
