import React, {FC} from "react";
import "./styless.css";

type HokageDropdownProps = {
    list: any;
    changeTitle: (e: string) => void;
};

const HokageDropdown: FC<HokageDropdownProps> = ({list, changeTitle}) => {
    const handleSelectElection = (id: number, title: string) => {
        id && localStorage.setItem("election_id", String(id));
        title && localStorage.setItem("election_title", String(title));
        changeTitle(title)
        window.location.reload();
    };

    return (
        <div className="hokage_dropdown">
            <ul>
                {list?.map((d: any) => (
                    <li onClick={() => handleSelectElection(d?.id, d.title)} key={d?.id}>
                        {d?.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HokageDropdown;
