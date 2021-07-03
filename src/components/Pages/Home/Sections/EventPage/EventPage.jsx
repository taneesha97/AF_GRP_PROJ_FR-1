import React, {useEffect, useState} from 'react'
import EventComponent from "./EventComponent";
import '../../../../../CSS/event.css';
import AddEvent from "../../../Event/AddEvent";
import event1 from "../../../../../Images/EventImages/screen6.jpg";
import {BrowserRouter as Router, useHistory} from 'react-router-dom';
import Speaker from "../../../../KeySpeakers/SpeakersImges/profile.webp";
import Ratings1 from "../../../../Ratings/Ratings1";
import axios from "axios";
import {useSelector} from "react-redux";

const EventPage = () => {

    const history = useHistory();

    const [data, setData] = useState([]);

    const handleHistory = () => {
        history.push('/eventpage');
    }

    const fetchEventDetails = async () => {
        try {

            const response = await axios
                .get("https://application-framework-database.herokuapp.com/api/v1/events")//https://application-framework-database.herokuapp.com/api/v1/events
                .catch((error) => {
                    console.log(error);
                });
            setData(response.data);
            console.log(response.data);

        } catch (err) {
            console.log("Error");
            console.log(err.message);
        }
    }

    useEffect(() => {
        // dispatch(timeEntryActions.getTimeEntryDetail())
        fetchEventDetails();
    }, [])

    const rows = [
        {"title1": 'Filter Page',"title2": 'name1', "image": event1},
        {"title1": 'component2',"title2": 'name2', "image": event1},
        {"title1": 'component3',"title2": 'name3', "image": event1},
        {"title1": 'component4',"title2": 'name3', "image": event1},
    ];

    // This should include a filter. Home component
    return (<React.Fragment>
            <div className="mainheader">
                <div className="header">
                    <button className="button"
                            onClick ={(e) => {
                                e.preventDefault();
                                handleHistory();
                            }}>View All</button>
                    <h3 className="main1">Event Page</h3>
                    <p className="second">This section contain all the events</p>
                </div>
                <br />
                <div className="home-container-main">
                    <div className="main-home-row">
                        {data.slice(0,4).map((row)=> (
                                <EventComponent rows = {row}/>
                        ))}
                    </div>
                </div>
                <br/>
            </div>
        </React.Fragment>
    )
}

export default EventPage
