import {createContext, useState, useContext} from "react";

const AddVoterContext = createContext();

export function useAddVoterContext() {
    return useContext(AddVoterContext);
}

export function AddVoterProvider({children}) {
    const [image, setImage] = useState(null);
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [continent, setContinent] = useState("");
    const [country, setCountry] = useState("");
    const [organization, setOrganization] = useState("");
    const [invite_people, setInvite_people] = useState(0);
    const [status, setStatus] = useState("");
    const [election, setElection] = useState(null);
    const [phone_number, setPhone_number] = useState("");
    const [telegram, setTelegram] = useState("");
    const [facebook, setFacebook] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [email, setEmail] = useState("");
    const [instagram, setInstagram] = useState("")

    return (
        <AddVoterContext.Provider
            value={{
                image,
                setImage,
                continent,
                setContinent,
                country,
                setCountry,
                first_name,
                setFirst_name,
                last_name,
                setLast_name,
                organization,
                setOrganization,
                invite_people,
                setInvite_people,
                status,
                setStatus,
                election,
                setElection,
                phone_number,
                setPhone_number,
                telegram,
                setTelegram,
                facebook,
                setFacebook,
                whatsapp,
                setWhatsapp,
                email,
                setEmail,
                instagram,
                setInstagram
            }}
        >
            {children}
        </AddVoterContext.Provider>
    );
}
