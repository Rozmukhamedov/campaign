import dayjs from "dayjs";
import {useForm} from "@mantine/form";
import "./style.css";
import closeIcon from "assets/images/closeicon.svg";
import React from "react";
import {useElectionEventCreate} from "hooks/mutation/useElectionEventCreate";
import {DatePicker, TimeInput} from "@mantine/dates";
import toast from "react-hot-toast";
import {useElectionContext} from "context/ElectionContext";
import {queryClient} from 'services/accountAPI';
import {useEventModalContext} from "context/OpenEventModal";
import {Modal, TextInput, Button, Textarea} from "@mantine/core";
import qs from "qs";
import {useLocation, useNavigate} from "react-router-dom";
import { useElectionEventStatistics } from "hooks/query/useElectionEventStatistics";

type addEventProps = {
    opened: boolean;
    setOpened?: any;
};
const AddEventModal: React.FC<addEventProps> = ({setOpened}) => {
    const form = useForm();
    const {electionId} = useElectionContext();
    const {pathname} = useLocation();
    const {isOpen, setOpen} = useEventModalContext();
    const navigate = useNavigate();
    const eventCreateMutation = useElectionEventCreate();

    const electionEventStatistics = useElectionEventStatistics(electionId);
    const statisticsData = electionEventStatistics.data;
    const votingDay = new Date(statisticsData?.voting_day).getTime();

    const handleAddEvent = (values: any) => {
        const data = {
            time: `${dayjs(values.date).format('DD/MM/YY')} ${values?.time?.getHours()}:${values?.time?.getMinutes()}:${values?.time?.getSeconds()}`,
            election: electionId,
            address: values?.address,
            title: values?.title,
            text: values?.text
        }
        const createEvent = eventCreateMutation.mutateAsync(data);
        createEvent.then((res) => {
            setOpen(false);
            navigate({
                pathname,
                search: qs.stringify({
                    event_id: res?.data?.id,
                }),
            });
            form.reset();
            queryClient.refetchQueries("/election/events/statistic/")
            queryClient.refetchQueries("use-get-all-event-query")
            toast.success("Event successfully created")
        }).catch((err) => {
            toast.error("Something went wrong!")
        })
    }


    return (
        <div className="addeventmodal">
            <Modal className="add_event_modal" size="auto" opened={isOpen} onClose={() => setOpen(false)}>
                <div className="addeventmodal__wrapper">
                    <div className="addeventmodal__top">
                        <h2>Add Event</h2>
                        <div>
                            <img src={closeIcon} onClick={() => setOpen(false)}/>
                        </div>
                    </div>
                    <form onSubmit={form.onSubmit(handleAddEvent)}>
                        <TextInput
                            variant="filled"
                            label="Event Name"
                            placeholder="Type your Event Name"
                            value={form?.values?.title}
                            {...form.getInputProps("title")}
                        />
                        <div className="d-flex justify-start">
                            <DatePicker
                                variant="filled"
                                placeholder="Pick date"
                                style={{marginRight: 10}}
                                label="Event date"
                                withAsterisk
                                minDate={dayjs(new Date()).endOf('month').subtract(6, 'days').toDate()}
                                maxDate={dayjs(new Date(statisticsData?.voting_day)).endOf('month').subtract(3, 'days').toDate()}
                                value={form?.values?.date}
                                {...form.getInputProps("date")}
                            />
                            <TimeInput
                                // defaultValue={new Date()}
                                label="Event time"
                                withAsterisk
                                value={form?.values?.time}
                                {...form.getInputProps("time")}
                            />
                        </div>
                        <TextInput
                            variant="filled"
                            mt="sm"
                            label="Location"
                            placeholder="Type your Location"
                            value={form?.values?.address}
                            {...form.getInputProps("address")}
                        />
                        <Textarea
                            placeholder="Your your description"
                            label="Description"
                            value={form?.values?.text}
                            {...form.getInputProps("text")}
                        />

                        <div className="addeventmodal_btn">
                            <Button type="submit" mt="sm">
                                Add
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default AddEventModal;
