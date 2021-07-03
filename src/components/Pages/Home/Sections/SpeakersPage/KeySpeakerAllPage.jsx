import React, {useEffect, useState} from 'react'
import './KeySpeakersAllPage.scss';
import {useSelector} from "react-redux";
import KeySpeakerForm from "../../../../KeySpeakers/KeySpeakersForm/KeySpeakerForm";
import KeySpeaker1 from "../../../../KeySpeakers/KeySpeaker1";
import axios from "axios";
import {Container, TextField, Typography} from "@material-ui/core";
import {useHistory} from "react-router";


function KeySpeakerAllPage() {

    const [keySpeakerData, setKeySpeakerData] = useState([]);
    const history = useHistory();
    const users = useSelector((state) => state.users);
    const [flag, setFlag] = useState(null)
    const [isSubmited, setIsSubmitted] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const fetchKeySpeakerDetails = async () => {
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
        fetchKeySpeakerDetails();
    }, [isSubmited])

    //Add this to protected Components to avoid unauthorized users from comming

    const navigation = () => {
        history.push("/loginpage");
    }

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
        <div className="key-speaker-page">
            <h1>All Key Speakers page</h1>
            <Container className="" maxWidth="md">
                <Typography className="">Search Items</Typography>
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
            <div className="key-speakers-form">
                <KeySpeakerForm isSubmitted = {setIsSubmitted}/>
            </div>
            <div className="all-key-speakers-list">
                <div className="all-key-speakers-row">
                    {keySpeakerData.filter((val) => {
                        if(searchTerm == ""){
                            return val
                        } else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                            return val
                        }
                    }).map((row) => (
                        console.log(row),
                            <KeySpeaker1 rows={row}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default KeySpeakerAllPage
