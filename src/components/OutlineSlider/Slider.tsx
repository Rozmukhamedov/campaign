import {Slider} from "@mantine/core";
import {ReactNode, useEffect} from "react";

type DataObject = {
    label: ReactNode;
    value: number;
};
type ResultsProps = {
    data: DataObject[];
    today: number;
};


function Demo({data, today}: ResultsProps) {

    // useEffect(() => {
    //     const today_div: any = document.querySelector(".today_div")
    //     today_div.setAttribute("style", "opacity:1")
    //     console.log(today_div, 100)
    // }, [data])

    return (
        <>
            {data?.every(item => !isNaN(item?.value)) &&
                <Slider
                    className="slider_top_container"
                    label={(val) => data.find((mark) => mark.value !== val)?.value}
                    // defaultValue={100}
                    value={100}
                    disabled
                    marks={data?.sort((a, b) => a?.value - b?.value)}
                    // styles={{markLabel: {display: 'none'}}}
                />}
        </>

    );

}

export default Demo;
