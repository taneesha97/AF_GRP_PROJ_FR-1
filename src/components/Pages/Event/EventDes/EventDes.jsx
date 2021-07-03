import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import './eventdes.style.css'

const EventDes = (props) => {
    const history = useHistory();
    const [eventdata, setEventdata] = useState([]);

    const eventid = props.match.params.value;

    const onClick = () => {
        history.push('/payment/' + eventdata.eventName);
    }

    useEffect(() => {
        getEventData();
    }, [])

    const getEventData = async () => {
        try {
            const response = await axios
                .get("https://application-framework-database.herokuapp.com/api/v1/getEventById/"+eventid)
                .catch((error) => {
                });
            setEventdata(response.data);
            console.log(response.data);

        } catch (err) {
            console.log("Error");
            console.log(err.message);
        }
    }

    return(
        <div className="event-detail-con">
            <h1 >{eventdata.eventName}</h1>
            <h2>{eventdata.description}</h2>
            <img src={eventdata.image}/>
            <div className="event-details-down">
                <hr/>
                <h3>Venue: {eventdata.eventPlace}</h3>
                <h3>Main Speaker: {eventdata.mainSpeaker}</h3>
                <h3>Event Organizer{eventdata.organizerName}</h3>
                <h3>Event Sponsor: {eventdata.sponsor}</h3>
                <h3>Event Status: {eventdata.reject}</h3>
                <h3>Event Price: $500.00</h3>
                <hr/>
            </div>
            <button onClick={onClick} className="auth-button">Enroll Now</button>


        </div>
    )
}
export default EventDes
