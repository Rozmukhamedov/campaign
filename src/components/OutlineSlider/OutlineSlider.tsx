import "./styless.css";
import Demo from "./Slider";
import {useElectionContext} from "context/ElectionContext";
import {useElectionEventStatistics} from "hooks/query/useElectionEventStatistics";
import dayjs from "dayjs";

const OutlineSlider = () => {

    const {electionId} = useElectionContext();
    const electionEventStatistics = useElectionEventStatistics(electionId);
    const statisticsData = electionEventStatistics.data;
    const todayInString = dayjs().format("YYYY-MM-DD");

    const startDay = new Date(statisticsData?.starting_day).getTime();
    const votingDay = new Date(statisticsData?.voting_day).getTime();
    const today = Math.round(
        ((new Date().getTime() - startDay) * 100) / (votingDay - startDay)
    );

    const eventData = statisticsData?.events?.map(
        ({
             title,
             time,
             is_deleted,
         }: {
            time: string;
            title: string;
            is_deleted: boolean;
        }) => {
            let timeInTimeStamp = new Date(time?.split(" ")?.[0]).getTime();
            if (!is_deleted) {
                return {
                    label: <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column"
                    }}><p
                        style={{marginBottom: 0}}>{title}</p> <p
                        style={{marginBottom: 0}}>{time?.split(" ")?.[0]}</p></div>,
                    value: Math.round(
                        ((timeInTimeStamp - startDay) * 100) / (votingDay - startDay)
                    ),
                };
            }
            return null;
        }
    );

    const eventDateList = [
        {
            label: <div id="starting_day" style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}><p
                style={{marginBottom: 0}}>Start</p> <p
                style={{marginBottom: 0}}>{statisticsData?.starting_day}</p></div>,
            value: 0,
        },
        {
            label: <div id="today_div" style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}><p
                style={{marginBottom: 0}}>Today</p> <p
                style={{marginBottom: 0}}>{todayInString}</p></div>,
            value: today,
        },
        {
            label: <div id="voting_day" style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}><p
                style={{marginBottom: 0}}>Voting day</p> <p
                style={{marginBottom: 0}}>{statisticsData?.voting_day}</p></div>,
            value: 100,
        },
    ];

    return (
        <div className="outline__wrapper">
            <div className="outline__disable"></div>
            {/*<ul className="outline__top-ul">*/}
            {/*    <h3 className="outline__start">Start</h3>*/}
            {/*    <li>Meeting with thr President of Nourth Korea</li>*/}
            {/*    <li>Meeting with thr President of Nourth Korea</li>*/}
            {/*    <li className="outline__today">Today</li>*/}
            {/*    <li>Meeting with thr President of Nourth Korea</li>*/}
            {/*    <li className="outline__voting">Voting Day</li>*/}
            {/*</ul>*/}
            {eventData && (
                <Demo
                    data={eventDateList.concat(eventData?.filter((item: any) => item !== null))}
                    today={today}
                />
            )}
            {/*<ul className="outline__bottom-ul">*/}
            {/*    <li>19.03.2022</li>*/}
            {/*    <li>19.03.2022</li>*/}
            {/*    <li>19.03.2022</li>*/}
            {/*    <li>19.03.2022</li>*/}
            {/*    <li>19.03.2022</li>*/}
            {/*    <li>19.03.2022</li>*/}
            {/*</ul>*/}
        </div>
    );

};

export default OutlineSlider;
