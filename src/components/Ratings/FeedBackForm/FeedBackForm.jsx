import React, {useEffect, useState} from 'react';
import { Grid, Paper, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {makeStyles} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import Star from "../Star/Star";
import axios from "axios";
import {useHistory} from "react-router";

const useStyles = makeStyles(theme => ({
    pageContent: {
        padding: theme.spacing(3),
        margin: theme.spacing(2),
        width: theme.spacing(70),
        height: theme.spacing(60)
    }
}))

const useStyle = makeStyles(theme => ({
    root:{
        '& .MuiFormControl-root':{
            width: theme.spacing(50),
            margin:theme.spacing(2)
        }
    }
}))

function FeedBackForm({isSubmitted}){

    const classes = useStyles();
    const history = useHistory();
    const classes2 = useStyle();
    const dispatch = useDispatch();

    const users = useSelector((state) => state.users);
    const [flag, setFlag] = useState(null)
    const [name, setName] = useState("");
    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState("");

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


    //submit the data
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(rating);
        const data = {
            name,
            feedback,
            rating
        }
        console.log(data)
        axios.post('https://application-framework-database.herokuapp.com/api/v1/feedback', data).then(() => {
            isSubmitted(true);
            alert("Data added");
            isSubmitted(false);
        }).catch((err) => {
            console.log(err);
            alert("Feed Back not inserted");
        })
    }

    return (
        <div>
            <Paper className={classes.pageContent}>
                <h3>FeedBack Form</h3>
                <div><Star value={5} method={setRating}/></div>
                <form className={classes2.root} onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="Name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                id="outlined-multiline-static"
                                label="Feed Back"
                                multiline
                                rows={3}
                                variant="outlined"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            />
                            <Button variant="contained" type='Submit' style={{background: "#1976d2", color:"white", width:"150px", marginTop:"40px"}} >
                                SUBMIT
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    )
}

export default FeedBackForm
