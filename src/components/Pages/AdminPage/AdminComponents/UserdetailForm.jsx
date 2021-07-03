import React, {useEffect, useState} from 'react'
import '../AdminPage.scss'
import {FormControl, Grid, InputLabel, MenuItem, Select, TextField} from '@material-ui/core';
import {Paper, makeStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {useDispatch, useSelector} from 'react-redux';
import axios from "axios";
import {useHistory} from "react-router-dom";
const useStyles = makeStyles(theme => ({
    pageContent: {
        // margin: theme.spacing(5),
        padding: theme.spacing(3),
        margin: theme.spacing(2),
        width: theme.spacing(70),
        height: theme.spacing(90)
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

function UserdetailForm({value, isSubmitted}){
    const classes = useStyles();
    const classes2 = useStyle();
    const dispatch = useDispatch();
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastname] = useState("");
    const[userName, setUserName] = useState("");
    const[password, setPassword] = useState("");
    const[type, setType] = useState("");
    const users = useSelector((state) => state.users);
    const [flag, setFlag] = useState(null)
    console.log(users.userToken);
    const history = useHistory();

    const handleHistory = () => {
        history.push('/admin');
    }

    axios.interceptors.request.use(
        config => {
            config.headers.authorization = 'Bearer ' + users.userToken;
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    )



    useEffect(() => {
        setFirstName(value.firstName);
        setLastname(value.lastName);
        setUserName(value.userName);
        setPassword(value.password);
        setType(value.type);
    }, [value])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.userName);
        const userData = {
            firstName,
            lastName,
            userName,
            password,
            type
        }

        console.log(userData);
        axios.put('https://application-framework-database.herokuapp.com/api/v1/updateUser/'+value.id, userData).then(() => {

            isSubmitted(true)
            alert("user updated");
            isSubmitted(false)
        }).catch((err) => {
            console.log(err);
        })

    }


    return (
        <Paper className={classes.pageContent}>
            <h3>User Entry Form</h3>
            <form className={classes2.root} onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={6}>
                        <InputLabel> First Name</InputLabel>
                        <TextField
                            variant="outlined"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <InputLabel> Last Name</InputLabel>
                        <TextField
                            variant="outlined"
                            name="lastName"
                            label="last name"
                            defaultValue={lastName}
                            value={lastName}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                        <InputLabel> User Name</InputLabel>
                        <TextField
                            variant="outlined"
                            name="userName"
                            defaultValue={userName}
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <InputLabel> Password</InputLabel>
                        <TextField
                            variant="outlined"
                            name="password"
                            type="password"
                            defaultValue={password}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputLabel> Type </InputLabel>
                        <FormControl variant="outlined" >
                            <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                defaultValue={type}
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                //setSelectedTags( e ? e.map(item => item.value) : []);
                                label="Age"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="Reviewer">Reviewer</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                                <MenuItem value="Researcher">Researcher</MenuItem>
                                <MenuItem value="Editor">Editor</MenuItem>
                                <MenuItem value="Workshop Conductor">Workshop Conductor</MenuItem>
                                <MenuItem value="Attendee">Attendee</MenuItem>
                                <MenuItem value="User">User</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" type='Submit' style={{background: "#1976d2", color:"white", width:"150px", marginLeft:"13px"}} >
                            SUBMIT
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>



    )
}

export default UserdetailForm
