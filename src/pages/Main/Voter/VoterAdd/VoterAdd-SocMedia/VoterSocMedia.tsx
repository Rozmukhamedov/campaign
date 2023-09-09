import "./style.css";
import React, {useState} from "react";
import {useForm} from "@mantine/form";
import {Button, TextInput, Grid} from "@mantine/core";
import {useCreateVoterMutation} from "hooks/mutation";
import {useAddVoterContext} from "context/AddVoterContext";
import closeIcon from "assets/images/closeicon.svg";
import {useLocation} from "react-router-dom";
import {useElectionContext} from "context/ElectionContext";
import {queryClient} from "services/accountAPI";
import toast from "react-hot-toast";

type VoterSocMediaProps = {
    setOpenGrid: boolean | any;
};
const VoterSocMedia: React.FC<VoterSocMediaProps> = ({setOpenGrid}) => {
    const [statusState, setStatusState] = useState("vip");
    const [isHovering, setIsHovering] = useState(-1);
    const useCreateVoter = useCreateVoterMutation();
    const {electionId} = useElectionContext();
    const formData = new FormData();
    const voterStatus = [
        {
            title: "100%",
            params: "vip",
            color: "#000000"
        },
        {
            title: "75%",
            params: "gold",
            color: "#FBC22E"
        },
        {
            title: "50%",
            params: "silver",
            color: "#7E7E7E"
        },
        {
            title: "25%",
            params: "bronze",
            color: "#AF713F"
        },
    ];
    const {image, first_name, last_name, organization, phone_number, continent, country} = useAddVoterContext();

    const form = useForm({
        initialValues: {
            telegram: "",
            whatsapp: "",
            facebook: "",
            email: "",
            firstname: first_name,
            lastname: last_name,
            phone: phone_number,
            organization: organization,
        },
        validate: {
            // phone: (value) =>
            //     value.length < 2 ? "Phone must have at least letters" : null,
            // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
        },
    });

    const createVoter = (e: any) => {
        formData.append("phone_number", phone_number)
        formData.append("telegram", e.telegram)
        formData.append("facebook", e.facebook)
        formData.append("whatsapp", e.whatsapp)
        formData.append("email", e.email)
        formData.append("first_name", first_name)
        formData.append("last_name", last_name)
        formData.append("organization", organization)
        formData.append("status", statusState)
        formData.append("election", electionId)
        formData.append("continent", continent)
        formData.append("country", country)
        formData.append("invite_people", "0")
        
        !!image && formData.append("image", image)

        const createVoter = useCreateVoter.mutateAsync(formData);
        createVoter
            .then((res) => {
                setOpenGrid("");

                toast.success("Voter successfully added")
                queryClient.refetchQueries("/voters/");
            })
            .catch((err) => {
                toast.error(err?.response?.data?.[0])
                console.log(err, "err");
            });
    };

    return (
        <div className="votersoc__wrapper">
            <div className="votersoc__top">
                <h2>Add voter</h2>
                <img onClick={setOpenGrid} src={closeIcon} alt="Close"/>
            </div>
            <div className="votersoc__form">
                <p>Social media</p>
                <form onSubmit={form.onSubmit(createVoter)}>
                    <Grid gutter="sm">
                        <Grid.Col span={6}>
                            <TextInput
                                placeholder="Telegram"
                                {...form.getInputProps("telegram")}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                placeholder="Whatsapp"
                                {...form.getInputProps("whatsapp")}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                placeholder="Facebook"
                                {...form.getInputProps("facebook")}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                type="email"
                                placeholder="Email address"
                                {...form.getInputProps("email")}
                            />
                        </Grid.Col>
                    </Grid>
                    <div className="votersoc__choose-status">
                        <h3>Choose status</h3>
                        <div>
                            {voterStatus.map((status, index: number) => (
                                <button key={index}
                                        type="button"
                                        onClick={() => setStatusState(status.params)}
                                        className={`${
                                            status.params == statusState ? "active" : null
                                        }`}
                                        onMouseEnter={() => setIsHovering(index)}
                                        onMouseLeave={() => setIsHovering(-1)}
                                        style={status.params === statusState || isHovering === index ? {
                                            backgroundColor: status.color,
                                            color: "#fff",
                                        } : {}}
                                >
                                    {status.title}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="votersoc__btn-Save">
                        <Button loading={useCreateVoter?.isLoading} type="submit">Save</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VoterSocMedia;
