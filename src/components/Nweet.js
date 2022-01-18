import { dbService } from "fBase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text)
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if (ok) {
            // delete tweet
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
        } else {
            //  non delete tweet
        }
    }
    const toggleEditing = () => setEditing(prev => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(nweetObj, newNweet);
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet,
        })
        setEditing(false);
    }
    const onChange = (event) => {
        const { target: { value } } = event;
        setNewNweet(value);
    }
    return (
        <div>
            {
                editing ?
                    <>
                        <form onSubmit={onSubmit}>
                            <input
                                type="text"
                                onChange={onChange}
                                placeholder="Edit yout tweet"
                                value={newNweet}
                                required />
                            <input type="submit" value="Update Nweet"/>
                        </form>
                        <button
                            onClick={toggleEditing}
                        >Cancel</button></> :
                    <>
                        <h4>{nweetObj.text}</h4>
                        { isOwner && (
                            <>
                                <button onClick={onDeleteClick}>Delete Nweet</button>
                                <button onClick={toggleEditing}>Edit Nweet</button>
                            </>
                        )}</>
            }
        </div>)
}

export default Nweet;

/*
[Clear버튼 클릭 후 file input에 남아 있는 이미지 파일명 지우기]

1. useRef()훅을 통해 fileInput변수를 만들고 file input과 연결시켜줍니다.
const fileInput = useRef();
input type="file" accept="image/*" onChange={onClearAttachment} ref={fileInput}

2. Clear버튼을 눌렀을 때 fileInput객체 안에 current의 value값을 가져와서 비워줍니다.
onClearAttachment = () => {
fileInput.current.value = "";
}
*/