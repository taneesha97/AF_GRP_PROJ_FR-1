import React, {useEffect, useState} from "react";
import './AddEvent.style.css'
import TextField from '@material-ui/core/TextField';
import FileBase from 'react-file-base64';

import axios from "axios";
import {useSelector} from "react-redux";
import {useHistory} from "react-router";


const  AddEvent = () =>{
    const history = useHistory();
    const users = useSelector((state) => state.users);
    const [flag, setFlag] = useState(null)
    const [eventType , setEventType] = useState("");
    const [eventName , setEventName] = useState("");
    const [organizerName , setOrganizerName] = useState("");
    const [mainSpeaker , setMainSpeakerName] = useState("");
    const [dateTime , setDateTime] = useState("");
    const [eventPlace , setPlace_Link] = useState("");
    const [description  , setDescription ] = useState("");
    const [limitOfPeople  , setNoOfPeople ] = useState("");
    const [sponsor   , setSponsor  ] = useState("");
    const [status  , setStatus ] = useState("reject");
    const [image  , setImage ] = useState("");
    let data;

    axios.interceptors.request.use(
        config => {
            config.headers.authorization = 'Bearer ' + users.userToken;
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    )

    const navigation = () => {
        history.push("/loginpage");
    }

    useEffect(()=> {
        if(users.userType === "uu"){
            navigation()
        } else {
            setFlag(true);
        }
    }, [])

    if(!flag){
        return null;
    }


    const onHandle = (e) => {
        e.preventDefault();
        data = {
            eventName,
            eventPlace,
            dateTime,
            organizerName,
            eventType,
            mainSpeaker,
            description,
            limitOfPeople,
            sponsor,
            status,
            image
        }
        console.log(data)
        axios.post('https://application-framework-database.herokuapp.com/api/v1/event', data).then(() => {
        }).catch((err) => {
            console.log(err);
            alert("event data not inserted");
        })
    }

    return(
        <div className="card" data-testid='add-event-card'>
            <div className="form-wrapper" data-testid='add-event-wrapper'>
                <form data-testid='add-event-form' onSubmit={onHandle}>
                    <h1 className="event-header" data-testid='add-event-header'>Add Event</h1>
                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group" data-testid='radio-button-field'>
                        <input type="radio" className="btn-check" name="btnradio" id="btnradio1" value={eventType} onClick={(e) => setEventType(e.target.value)}/>
                        <label className="btn btn-outline-primary" htmlFor="btnradio1">Conference</label>

                        <input type="radio" className="btn-check" name="btnradio" id="btnradio2" value={eventType} onClick={(e) => setEventType(e.target.value)}/>
                        <label className="btn btn-outline-primary" htmlFor="btnradio2">Research Paper</label>

                        <input type="radio" className="btn-check" name="btnradio" id="btnradio3" value={eventType} onClick={(e) => setEventType(e.target.value)} />
                        <label className="btn btn-outline-primary" htmlFor="btnradio3">Workshop</label>
                    </div>
                    <div className="material-textfield" data-testid='event-name-field-div'>
                        <input value={eventName}
                               onChange={(e) => setEventName(e.target.value)}
                               className="input-fields"
                               type='text'
                               placeholder=' '
                               name='eventname'
                               data-testid='event-name-field'/>
                        <label className="input-lable" data-testid='event-name-field-label'>Event Name</label>
                    </div>
                    <div className="material-textfield" data-testid='organizer-name-field-div'>
                        <input value={organizerName}
                               onChange={(e) => setOrganizerName(e.target.value)}
                               className="input-fields"
                               type='text'
                               placeholder=' '
                               name='organizerName'
                               data-testid='organizer-name-field'/>
                        <label className="input-lable" data-testid='organizer-name-field-label'>Organizer Name</label>
                    </div>
                    <div className="material-textfield" data-testid='mainspeaker-name-field-div'>
                        <input value={mainSpeaker}
                               onChange={(e) => setMainSpeakerName(e.target.value)}
                               className="input-fields"
                               type='text'
                               placeholder=' '
                               name='mainSpeakerName'
                               data-testid='mainspeaker-name-field'
                               id='userName' />
                        <label className="input-lable" data-testid='mainspeaker-name-field-label'>Main Speaker Name</label>
                    </div>
                    <div className="material-textfield" data-testid='place-link-field-div'>
                        <input value={eventPlace}
                               onChange={(e) => setPlace_Link(e.target.value)}
                               className="input-fields"
                               type='text'
                               placeholder=' '
                               name='place-link'
                               data-testid='place-link-field'/>
                        <label className="input-lable" data-testid='place-link-field-label'>Place or Link</label>
                    </div>

                    <div>
                        <TextField
                            value={dateTime}
                            id="date"
                            type="date"
                            label="Select a date"
                            defaultValue="yyyy-mm-dd"
                            className="textField-clock"
                            onChange={(e) => setDateTime(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div className="material-textfield" data-testid='description-field-div'>
                        <textarea value={description}
                               onChange={(e) => setDescription(e.target.value)}
                               className="input-fields"
                               type='text'
                               placeholder=' '
                               name='description'
                               data-testid='description-field'/>
                        <label className="input-lable" data-testid='description-field-label'>Description</label>
                    </div>
                    <div className="material-textfield" data-testid='sponsor-field-div'>
                        <input value={sponsor}
                               onChange={(e) => setSponsor(e.target.value)}
                               className="input-fields"
                               type='text'
                               placeholder=' '
                               name='sponsor'
                               data-testid='sponsor-field'/>
                        <label className="input-lable" data-testid='sponsor-field-label'>Sponsor</label>
                    </div>
                    <div className="material-textfield" data-testid='noOfPeople-field-div'>
                    <input value={limitOfPeople}
                           onChange={(e) => setNoOfPeople(e.target.value)}
                           className="input-fields"
                           type='text'
                           placeholder=' '
                           name='noOfPeople'
                           data-testid='noOfPeople-field'/>
                    <label className="input-lable" data-testid='noOfPeople-field-label'>Limit of people</label>
                    </div>

                    <div>
                        {/*<input type="file" className="form-control-file" id="img" value={itemData.image} onChange={(e) => setItemData({...itemData, image: e.target.value})}/ >*/}
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({base64}) => setImage(base64)}
                        />
                    </div>

                    <button className="auth-button" type="submit" data-testid='add-event-submit-btn'>Send</button>
                </form>
            </div>

        </div>
    )
}
export default AddEvent
