import { dbService } from "fBase";
import React, { useState, useEffect } from "react";

const Home = () => {
    // 
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    const getNweets = async () => {
        const dbNweets = await dbService.collection("nweets").get();
        dbNweets.forEach(docu => {
            const nweetObject = {
                ...docu.data(),
                id: docu.id,
            }
            setNweets((prev) => [nweetObject, ...prev])
        })
    }

    useEffect(() => {
        getNweets();
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            // nweet: nweet
            nweet,
            createdAt: Date.now()
        });
        setNweet("")
    };
    const onChange = (event) => {
        const { target: { value } } = event;
        setNweet(value);
    };
    console.log(nweets);
    return (
        <div>
            <form>
                <input
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                    value={nweet}
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value="Nweet"
                    onClick={onSubmit}
                />
            </form>
            <div>{nweets.map((nweet)=> <div key={nweet.id}>
                <h4>{nweet.nweet}</h4>
            </div>)}</div>
        </div>
    )
}
export default Home;