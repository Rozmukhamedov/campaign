import React from "react";
import Note from "./Note";
import useInfiniteQueryForScroll from "hooks/custom/useInfiniteQueryForScroll";
import {useElectionContext} from "context/ElectionContext";
import {MdAddCircle} from "react-icons/md";
import Skeleton from "components/Skeleton";


const NotesList = ({setBlock}: any) => {
    const {electionId} = useElectionContext();
    const notesNode = document.querySelector("#notes");
    const {data, refetch, isLoading} = useInfiniteQueryForScroll("/election/note/", notesNode, {election: electionId})
    const handleNewNote = () => {
        setBlock(true)
    }

    return (
        <>
            <ul id="notes" className="notes_list">
                <div onClick={handleNewNote} className="new_block">
                    <MdAddCircle/>
                    <span>New block</span>
                </div>
                {!isLoading ? data?.pages?.map((page) => {
                    return page?.data?.results?.map((item: any, key: number) => {
                        return (
                            <Note {...{item, key, setBlock}} />
                        );
                    })
                }) : <Skeleton/>}
            </ul>
        </>
    )
}

export default NotesList;