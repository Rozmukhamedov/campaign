import "./style.css";
import React, {useEffect, useState} from "react";
import EventItem from "./EventItem";
import EventModal from "./EventModal/EventModal";
import Skeleton from "components/Skeleton";
import {useElectionContext} from "context/ElectionContext";
import useInfiniteQueryForScroll from "hooks/custom/useInfiniteQueryForScroll";
import {useEventModalContext} from "context/OpenEventModal";

function Event() {
    const [opened, setOpened] = useState<boolean | number>(false);
    const {electionId} = useElectionContext();
    const {setOpen} = useEventModalContext();
    const params = {
        election: electionId,
    };

    const handleOpenAddEvent = () => {
        setOpened(true);
        setTimeout(() => {
            setOpen(true);
        }, 200);
    };
    const eventNode = document.querySelector("#event");
    const {data, refetch, isLoading} = useInfiniteQueryForScroll(
        "/election/event/pagination",
        eventNode,
        params
    );

    useEffect(() => {
        refetch();
    }, [opened]);

    return (
        <>
            <div className="event">
                <div className="event__top">
                    <h2>Events</h2>
                    <div className="event__add-btn">
                        <button onClick={handleOpenAddEvent}>Add</button>
                    </div>
                </div>
                <div id={"event"} className="event__list">
                    {!isLoading ? data?.pages?.map((page) => {
                        return page?.data?.results?.map((item: any, index: number) => {
                            return (
                                <EventItem
                                    item={item}
                                    key={index}
                                    refetch={refetch}
                                    opened={opened}
                                    setOpened={setOpened}
                                />
                            );
                        });
                    }) : <Skeleton/>}
                </div>
                <EventModal opened={opened} setOpened={setOpened}/>
            </div>
        </>
    );
}

export default Event;
