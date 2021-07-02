import React, {useEffect, useState} from 'react'
import './KeySpeakersAllPage.scss';
import {useSelector} from "react-redux";
import KeySpeakerForm from "../../../../KeySpeakers/KeySpeakersForm/KeySpeakerForm";
import KeySpeaker1 from "../../../../KeySpeakers/KeySpeaker1";
import axios from "axios";


function KeySpeakerAllPage() {

    const [keySpeakerData, setKeySpeakerData] = useState([]);
    const users = useSelector((state) => state.users);
    const [flag, setFlag] = useState(null)
    const [isSubmited, setIsSubmitted] = useState(false);

    const fetchKeySpeakerDetails = async () => {
        try {
            const response = await axios
                .get("http://localhost:8093/api/v1/keyspeakers")
                .catch((error) => {
                    console.log("Error", error);
                });
            setKeySpeakerData(response.data)

        } catch (err) {
            console.log("Error");
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchKeySpeakerDetails();
    }, [isSubmited])

    //Add this to protected Components to avoid unauthorized users from comming
    useEffect(()=> {
        if(users.userName === null){
            window.location.href='/loginpage';
        } else {
            setFlag(true);
        }
    }, [])

    if(!flag){
        return null;
    }

    return (
        <div className="key-speaker-page">
            <h1>All Key Speakers page</h1>
            <input type="search" name="" id="" className="search-speakers" placeholder="search downloads" /><br />
            <div className="key-speakers-form">
                <KeySpeakerForm isSubmitted = {setIsSubmitted}/>
            </div>
            <div className="all-key-speakers-list">
                <div className="all-key-speakers-row">
                    {keySpeakerData.map((row) => (
                        console.log(row),
                            <KeySpeaker1 rows={row}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default KeySpeakerAllPage