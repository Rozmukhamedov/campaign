import {useForm} from "@mantine/form";
import {TextInput} from "@mantine/core";

import "./style.css";
import backIcon from "assets/images/backicon.svg";
import phone from "assets/images/phone.svg";
import facebook from "assets/images/facebook.svg";
import telegram from "assets/images/telegram.svg";
import instagram from "assets/images/instagram.svg";
import qs from "qs";
import {useLocation} from "react-router-dom";
import Skeleton from "components/Skeleton";
import React from "react";
import Button from "components/Button";
import {useGetTeamById} from "hooks/query/useGetTeamById";
import {useTeamDetailsUpdateById} from "hooks/mutation/useTeamDetailsUpdateById";
import toast from "react-hot-toast";

interface TeamDetailsI {
    setOpenGrid: React.Dispatch<React.SetStateAction<string>>;
}

const TeamDetails: React.FC<TeamDetailsI> = ({setOpenGrid}) => {
    const {search} = useLocation();
    const query = qs.parse(search, {ignoreQueryPrefix: true});
    const teamData = useGetTeamById({id: query?.teamId});
    const teamDetails = teamData?.data;
    const useTeamEditData = useTeamDetailsUpdateById();


    const form = useForm({
        initialValues: {position: teamDetails?.position, responsibility: teamDetails?.responsibility},
        validate: {
            position: (value) =>
                value.length < 1 ? "Position have at least 1 letters" : null,
            responsibility: (value) =>
                value.length < 1 ? "Responsibilities have at least 1 letters" : null,
        },
    });
    const handleSubmit = (event: any) => {
        const teamEdit = useTeamEditData.mutateAsync({data: event, id: Number(query?.teamId)});
        teamEdit.then((res) => {
            teamData.refetch();
            form.reset();
            toast.success("Team member updated successfully")
        }).catch((err) => {
            toast.error(err?.response?.error)
        })
    }
    if (teamData?.isLoading) {
        return <Skeleton/>
    }

    return (
        <div className="teamdetails">
            <div className="teamdetails__top">
                <img src={backIcon} alt="close" onClick={() => setOpenGrid("")}/>
                <button onClick={() => setOpenGrid("edit-team")}>Edit</button>
            </div>
            <div className="teamdetails__soc-info">
                <div className="teamdetails__info">
                    <h3>{teamDetails?.first_name}</h3>
                    <p>{teamDetails?.organization}</p>
                    <div className="teamdetails__socicons">
                        <a href={"tel:" + teamDetails?.social_contacts?.phone_number}>
                            <img src={phone}/>
                        </a>
                        <a href={"https://www.facebook.com/" + teamDetails?.social_contacts?.facebook}>
                            <img src={facebook}/>
                        </a>
                        <a href={"https://t.me/" + teamDetails?.social_contacts?.telegram}>
                            <img src={telegram}/>
                        </a>
                        <a href={"https://www.instagram.com/" + teamDetails?.social_contacts?.instagram}>
                            <img src={instagram}/>
                        </a>
                    </div>
                </div>
                <div className="teamdetails__img">
                    <img
                        src={teamDetails?.image}
                        alt="Image"
                    />
                </div>
            </div>
            <div className="teamdetails__form">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        label="Position"
                        placeholder="Position"
                        defaultValue={teamDetails?.position}
                        {...form.getInputProps("position")}
                    />
                    <TextInput
                        label="Responsibilities"
                        placeholder="Responsibilities"
                        defaultValue={teamDetails?.responsibility}
                        {...form.getInputProps("responsibility")}
                    />
                    <Button type={"submit"} style={{float: "right", padding: "10px, 20px"}}
                            className="team__btn-add">Add</Button>
                </form>
            </div>
        </div>
    );
};

export default TeamDetails;
