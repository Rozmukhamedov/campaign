import {useAccountPopup} from "context/AccountPopupContext";
import "./style.css";
import {MdAddCircle, MdClear} from "react-icons/md";
import {useState} from "react";
import NotesList from "./_components/NotesList";
import AddNotes from "./_components/AddNotes";

const Notes = () => {
    const {handleMouseOver, handleMouseOut, isHovering} = useAccountPopup();
    const [block, setBlock] = useState(false);


    return (
        <div className={`${isHovering ? "notes" : "notes__hover"}`}>
            <div className="notes__top">
                <h2>Notes</h2>
                <div className="notes__block">
                    {block ? <div style={{cursor: "pointer", fontSize: 20, color: "#bfbfbf"}}
                                  onClick={() => setBlock(false)}>
                            <MdClear/>
                        </div> :
                        <div className="notes__dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>}
                </div>
            </div>
            <div className="votes__texteditor">
                {block ? <AddNotes {...{block, setBlock}}/> : <NotesList setBlock={setBlock}/>}
            </div>
        </div>
    );
};

export default Notes;
