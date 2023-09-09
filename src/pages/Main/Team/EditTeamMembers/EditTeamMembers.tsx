import React, {FormEvent, useEffect, useState} from "react";
import closeIcon from "../../../../assets/images/closeicon.svg";
import {FileButton, Grid, TextInput} from "@mantine/core";
import Button from "../../../../components/Button";
import {useElectionContext} from "../../../../context/ElectionContext";
import {useForm} from "@mantine/form";
import {request} from "../../../../services/api";
import toast from "react-hot-toast";
import {getBase64File} from "utils/general";
import qs from "qs";
import {useLocation} from "react-router-dom";
import {useGetTeamById} from "hooks/query/useGetTeamById";
import {queryClient} from "../../../../services/accountAPI";

const EditTeamMembers = ({setOpenGrid, setChangeTeam}: any) => {
    const {search} = useLocation();
    const query = qs.parse(search, {ignoreQueryPrefix: true})
    const useTeamDetails = useGetTeamById({id: query?.teamId, enabled: true});
    const teamDetails = useTeamDetails.data;
    const [file, setFile] = useState<string>(teamDetails?.image);
    const [loading, setLoading] = useState(false);
    const {electionId} = useElectionContext();
    const [formImg, setFormImg] = useState<any>();
    const formData = new FormData();

    const form = useForm({
        initialValues: {
            telegram: teamDetails?.telegram,
            whatsapp: teamDetails?.whatsapp,
            facebook: teamDetails?.whatsapp,
            email: teamDetails?.email,
            firstname: teamDetails?.first_name,
            lastname: teamDetails?.last_name,
            phonenumber: teamDetails?.phone_number,
        },

        validate: {
            firstname: (value) => (value.length < 2 ? "First name" : null),
            lastname: (value) => (value.length < 2 ? "Last name" : null),
            // telegram: (value) => (value.length < 2 ? "Telegram" : null),
            // whatsapp: (value) => (value.length < 2 ? "WhatsApp" : null),
            // facebook: (value) => (value.length < 2 ? "Facebook" : null),
            // email: (value) => (value.length < 2 ? "Email address" : null),
            // phonenumber: (value) =>
            //     value.length < 2 ? "phonenumber  must have at 2" : null,
        },
    });

    useEffect(() => {
        form.setValues({
            telegram: teamDetails?.telegram,
            whatsapp: teamDetails?.whatsapp,
            facebook: teamDetails?.whatsapp,
            email: teamDetails?.email,
            firstname: teamDetails?.first_name,
            lastname: teamDetails?.last_name,
            phonenumber: teamDetails?.phone_number,
        })
    }, [useTeamDetails.isSuccess])


    const handleTeamCreateSubmit = async (values: any, event: FormEvent<HTMLFormElement>) => {
        setLoading(true);
        values.firstname && formData.append("first_name", values.firstname);
        values.lastname && formData.append("last_name", values.lastname);
        values.phonenumber && formData.append("phone_number", values.phonenumber);
        values.telegram && formData.append("telegram", values.telegram);
        values.facebook && formData.append("facebook", values.facebook);
        values.whatsapp && formData.append("whatsapp", values.whatsapp);
        values.email && formData.append("email", values.email);
        formImg && formData.append("image", formImg);
        electionId && formData.append("election", electionId);

        request.patch(`/voters/${query?.teamId}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        }).then((res) => {
            toast.success("Updated successfully")
            setLoading(false);
            queryClient.refetchQueries("use-get-team-by-id")
            setOpenGrid("team_detail")
            form.reset();
        }).catch((err) => {
            toast.error(err?.response?.statusText)
            setLoading(false);
        })
    }
    const onFileChange = (file: any) => {
        setFormImg(file);
        getBase64File(file).then((res) => {
            setFile(res);
        })
    }


    return (
        <div className="addteam">
            <div className="addteam__top">
                <h2>Edit teammate</h2>
                <img
                    onClick={() => {
                        setChangeTeam("team")
                        setOpenGrid("team_detail")
                    }}
                    src={closeIcon}
                    alt="closeIcon"
                />
            </div>
            <div className="addteam__photo">
                <p>Photo</p>
                <div className="addteam__download-img">
                    <FileButton onChange={onFileChange} accept="">
                        {(props) => <Button {...props}>Choose photo</Button>}
                    </FileButton>
                    {/* /* props src={file}* / */}
                    {file &&
                        <img
                            src={file}
                            alt="voter-photo"
                        />
                    }
                </div>
            </div>
            <div className="addteamsoc__form">
                <form
                    onSubmit={form.onSubmit(handleTeamCreateSubmit)}
                    className="addteamsoc__form-control"
                >
                    <TextInput
                        label="First name"
                        placeholder="First name..."
                        {...form.getInputProps("firstname")}
                    />
                    <TextInput
                        label="Last name"
                        placeholder="Last name"
                        {...form.getInputProps("lastname")}
                    />
                    <TextInput
                        // type="number"
                        placeholder="Your phone"
                        label="Phone"
                        {...form.getInputProps("phonenumber")}
                    />
                    <p>Social media</p>
                    <Grid gutter="sm">
                        <Grid.Col span={6}>
                            <TextInput
                                placeholder="Telegram"
                                {...form.getInputProps("telegram")}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                placeholder="WhatsApp"
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
                                placeholder="Your email"
                                {...form.getInputProps("email")}
                            />
                        </Grid.Col>
                    </Grid>
                    <div className="addteam-btn">
                        <Button loading={loading} type="submit">Edit</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTeamMembers;