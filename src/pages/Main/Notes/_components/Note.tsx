import React from "react";
import dayjs from "dayjs";


const Note = ({item, setBlock}: any) => {
    const date = dayjs(item.created_at).format("DD.MM.YYYY")

    const handleNotesId = (id: number) => {
        setBlock(id)
    }

    return (
        <li className="each_note" onClick={() => handleNotesId(item?.id)}>
            <div className="note_title">{item.body}</div>
            <div>{date}</div>
        </li>
    )

}

export default Note;