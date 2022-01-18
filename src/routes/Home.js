import { dbService, storageService } from "fBase";
import React, { useState, useEffect } from "react";
import { finished } from "stream";
import Nweet from '../components/Nweet';
import { v4 as uuidv4 } from 'uuid'; 

const Home = ({ userObj }) => {
    // 
    console.log(userObj);
    const [text, setText] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("")

    useEffect(() => {
        // 실시간 리얼타임
        // onSnapshot은 기본적으로 데이터베이스에 무슨일이 있을 때, 알림을 받을 것임. 
        // 호출이됌.
        dbService.collection("nweets").onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setNweets(nweetArray);
        })
    }, [])

    const onSubmit = async (event) => {
        // 페이지 렌더링 못하도록 막는 함수 
        event.preventDefault();

        const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
        const response = await fileRef.putString(attachment, "data_url");
        console.log(response);
        // nweets이란 데이터베이스 컬렉션에 document를 추가하는 함수 
        // await dbService.collection("nweets").add({
        //     // nweet: nweet
        //     text,
        //     createdAt: Date.now(),
        //     // 로그인한사람이 누군지 알기위한 함수호출
        //     creatorId: userObj.uid
        // });
        setText("")
    };
    const onChange = (event) => {
        const { target: { value } } = event;
        setText(value);
    };
    const onFileChange = (event) =>{
        const { target: {files},} = event;
        const theFile = files[0];
        //fileReaderAPI 
        const reader = new FileReader();
        // npm i stream함
        reader.onloadend = (finishedEvent) => {
            // 파일 로딩이 끝날시 호출되는 함수
            const {currentTarget: { result }} = finishedEvent
            setAttachment(result)
        }
        reader.readAsDataURL(theFile);
    }
    const onClearAttachmentClick = () => {
        setAttachment("");
    }
    return (
        <div>
            <form>
                <input
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                    value={text}
                    onChange={onChange}
                />
                 <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                />
                <input
                    type="submit"
                    value="Nweet"
                    onClick={onSubmit}
                />
                {/* attachment가 있으면 img을 렌더링하는 코드 */}
                {attachment && <div>
                    <img src={attachment} width="100px" height="100px"></img>
                    <button onClick={onClearAttachmentClick}>clear photo</button>
                    </div>}
            </form>
            <div>
                {nweets.map((nweet) => {
                    return <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid} />
                }
                )}
            </div>
        </div>
    )
}
export default Home;