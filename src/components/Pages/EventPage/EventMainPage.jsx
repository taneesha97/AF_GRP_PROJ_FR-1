import React, {useEffect, useState} from 'react'
import AddEvent from "../Event/AddEvent";
import '../EventPage/EventMainPage.scss'
import {useSelector} from "react-redux";
import EventComponent from "../Home/Sections/EventPage/EventComponent";
import event1 from "../../../Images/EventImages/screen6.jpg";
import axios from "axios";
import {useHistory} from "react-router";

const EventMainPage = () => {

    const history = useHistory();

    //Use States.
    const users = useSelector((state) => state.users);
    const [flag, setFlag] = useState(null)
    const [data, setData] = useState([]);

    const navigation = () => {
        history.push("/loginpage");
    }

    useEffect(()=> {
        if(users.userName === null){
            navigation();
        } else {
            setFlag(true);
        }

        fetchDownloadCategoryDetails1();
    }, [])




    const fetchDownloadCategoryDetails1 = async () => {
        try {
            const response = await axios
                .get("https://application-framework-database.herokuapp.com/api/v1/events")
                .catch((error) => {
                    console.log("Error", error);
                });
            setData(response.data);

        } catch (err) {
            console.log("Error");
            console.log(err.message);
        }
    }

    if(!flag){
        return null;
    }

    const rows = [
        {"title1": 'Main Page',"title2": 'name1', "image": event1},
        {"title1": 'component2',"title2": 'name2', "image": event1},
        {"title1": 'component3',"title2": 'name3', "image": event1},
        {"title1": 'component4',"title2": 'name3', "image": event1},
        {"title1": 'component4',"title2": 'name3', "image": event1},
        {"title1": 'component4',"title2": 'name3', "image": event1},
    ];


    return (
        <React.Fragment>
            <div className="event-container">
                <div>
                    <AddEvent/>
                </div>
                <div>
                    <div className="home-container-filter">
                        <div className="event-home-row">
                            {data.slice(0,4).map((row)=> (
                                <EventComponent rows = {row}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default EventMainPage;
