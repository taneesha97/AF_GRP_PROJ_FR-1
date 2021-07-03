import React from 'react'
import '../../../../../CSS/event.scss';
import {useHistory} from "react-router-dom";
function EventComponent({rows}) {
    const history = useHistory();
    const event = rows.id;
    console.log(rows)
    const onClick = () => {
        history.push('/eventpage/' + event);
    }
    return (
        <div>
            <div className="event" onClick={onClick}>
                <div className="eventImage">
                        <img src={rows.image} alt="" className="image" />
                 </div>
                <div className="event-info">
                    <h2 className="event-info-main-title">{rows.eventName}</h2>
                    <p className="event-info-second-title">{rows.eventPlace}</p>
                </div>
            </div>
        </div>
    )
}

export default EventComponent
