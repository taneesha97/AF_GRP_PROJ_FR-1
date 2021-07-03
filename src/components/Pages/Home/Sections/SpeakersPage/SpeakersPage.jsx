import React, {useEffect, useState} from 'react';
import KeySpeaker1 from "../../../../KeySpeakers/KeySpeaker1";
import Speaker from '../../../../KeySpeakers/SpeakersImges/profile.webp'
import './keyspeakers.css'
import {useHistory} from "react-router-dom";
import DownloadComponent from "../DownloadPage/DownloadComponent/DownloadComponent";
import axios from "axios";
import KeySpeakerComponentHome from "./KeySpeakerComponentHome";

function SpeakersPage() {

    const [keySpeakerData, setKeySpeakerData] = useState([]);
    const history = useHistory();
    const handleHistory = () => {
        history.push('/allKeySpeakerPage');
    }

    const fetchKeySpeakerDetails2 = async () => {
        try {
            const response = await axios
                .get("https://application-framework-database.herokuapp.com/api/v1/keyspeakers")
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
        fetchKeySpeakerDetails2();
    }, [])

    return (<React.Fragment>
        <div className="speaker-section">
            <div className="speaker-header">
                <h2 className="speaker-header-main-header">Key Speakers</h2>
                {<button className="buttonDownload" onClick={(e) => {
                    e.preventDefault();
                    handleHistory();
                }}>View All</button>}
                <h4 className="speaker-header-second-header">Information</h4>
            </div>
            <div className="cardlayout-keynotespeakers-main">
                {keySpeakerData.slice(0,4).map((row) => (
                    console.log(row),
                        <KeySpeakerComponentHome rows={row}/>
                ))}
            </div>
        </div>


    </React.Fragment>)
}

export default SpeakersPage;
