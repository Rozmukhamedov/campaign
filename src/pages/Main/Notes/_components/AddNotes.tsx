import React, {useState} from "react";
import {Textarea} from "@mantine/core";
import Button from "components/Button";
import {useNoteCreate} from "hooks/mutation/useNoteCreate";
import {useElectionContext} from "context/ElectionContext";
import toast from "react-hot-toast";
import {queryClient} from "services/accountAPI";
import {useElectionNotesRetrieveId} from "hooks/query/useElectionNotesRetrieveId";
import {useElectionNoteDeleteById} from "hooks/mutation/useElectionNoteDeleteById";
import {useNoteUpdateById} from "../../../../hooks/mutation/useNoteUpdateById";


const AddNotes = ({setBlock, block}: any) => {
    const noteCreate = useNoteCreate();
    const {electionId} = useElectionContext();
    const noteDetails = useElectionNotesRetrieveId(block, typeof block === "number")
    const noteDelete = useElectionNoteDeleteById()
    const useNoteUpDate = useNoteUpdateById();
    const noteData = noteDetails?.data;
    const [text, setText] = useState(noteData?.body);
    const isButtonsToBottom = text?.split(" ")?.length > 25

    const handleDeleteNote = (id: number) => {
        const deletedData = noteDelete.mutateAsync(id);
        deletedData.then((res) => {
            toast.success("Deleted successfully");
            queryClient.refetchQueries("/election/note/");
            setBlock(false)
        }).catch((err) => {
            toast.error("Error deleting node")
        })
    }

    const handlePostData = (body: string) => {
        if (typeof block === "number") {
            const noteUpdate = useNoteUpDate.mutateAsync({data: {body, election: Number(electionId)}, id: block})
            return noteUpdate.then((res) => {
                toast.success("Notes updated successfully")
                queryClient.refetchQueries("/election/note/")
                setBlock(false)
            }).catch((err) => {
                toast.error("Error updating notes")
            })
        } else {
            if (text !== "") {
                const data = {
                    election: electionId,
                    body
                }
                const noteCreateMutation = noteCreate.mutateAsync(data);
                return noteCreateMutation.then((res) => {
                    toast.success("Notes successfully created")
                    setBlock(false)
                    queryClient.refetchQueries("/election/note/")
                    setText("")
                }).catch((err) => {
                    toast.error("Error creating notes")
                })
            }
            return toast.error("Notes should not be empty")
        }


    }
    const handleSendPress = (e: any) => {
        if (e?.key === "Enter") {
            handlePostData(e.target.value)
        }
    }

    return (
        <>
            <Textarea
                className="notes_area"
                placeholder="Your notes"
                value={text}
                defaultValue={noteData?.body}
                onChange={(e) => setText(e?.target?.value)}
                minRows={isButtonsToBottom ? 5 : 6}
                name="note"
                onKeyPress={handleSendPress}
            />
            <div className={isButtonsToBottom ? "notes_btn_bottom" : "notes_btn"}>
                {typeof block === "number" && <Button onClick={() => handleDeleteNote(block)}
                                                      className="vooter_btn-delete delete_btn">Delete</Button>}
                <Button onClick={() => handlePostData(text)} className="vooter_btn-add">Save</Button>
            </div>
        </>
    )
}

export default AddNotes;