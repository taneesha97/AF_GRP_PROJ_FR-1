import React, {useEffect, useState} from 'react'
import Ratings1 from "../../Ratings/Ratings1";
import './feedbackstyles.scss';
import FeedBackForm from "../../Ratings/FeedBackForm/FeedBackForm";
import Speaker from "../../KeySpeakers/SpeakersImges/profile.webp";
import KeySpeakerForm from "../../KeySpeakers/KeySpeakersForm/KeySpeakerForm";
import {useSelector} from "react-redux";
import axios from "axios";
import KeySpeaker1 from "../../KeySpeakers/KeySpeaker1";
import {Container, TextField, Typography} from "@material-ui/core";
import {useHistory} from "react-router";

function FeedBackAllPage() {

    const [feedbackData, setFeedbackData] = useState([]);
    const users = useSelector((state) => state.users);
    const [flag, setFlag] = useState(null)
    const [isSubmited, setIsSubmitted] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const history = useHistory();

    const fetchFeedBackDetails = async () => {
        try {
            const response = await axios
                .get("https://application-framework-database.herokuapp.com/api/v1/feedbacks")
                .catch((error) => {
                    console.log("Error", error);
                });
            setFeedbackData(response.data)

        } catch (err) {
            console.log("Error");
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchFeedBackDetails();
    }, [isSubmited])

    const navigation = () => {
        history.push("/loginpage");
    }

    //Add this to protected Components to avoid unauthorized users from comming
    useEffect(()=> {
        if(users.userName === null){
            navigation()
        } else {
            setFlag(true);
        }
    }, [])

    if(!flag){
        return null;
    }

    return (
        <div className="downloadallpage">
            <h1>All Feedback page</h1>
            <Container className="" maxWidth="md">
                <Typography className="" >Search Items</Typography>
                <TextField
                    id="filled-full-width"
                    label="Search"
                    style={{ margin: 8 }}
                    placeholder="Search Items.."
                    helperText="Search Items By Title"
                    fullWidth
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    margin="normal"
                    variant="filled"
                />
            </Container>
            <div className="alldownloadlist">
                <div className={"feed-back-form"}>
                    <FeedBackForm isSubmitted = {setIsSubmitted}/>
                </div>
                <div className="all-feedback-row">
                    <div className="cardLayout">
                        {feedbackData.filter((val) => {
                            if(searchTerm == ""){
                                return val
                            } else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                                return val
                            }
                        }).map((row) => (
                            console.log(row),
                                <Ratings1 rows={row}/>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default FeedBackAllPage
