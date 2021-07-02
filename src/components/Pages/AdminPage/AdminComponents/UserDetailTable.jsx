import '../AdminPage.scss'
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button, Link} from "@material-ui/core";
import axios from "axios";
import {useSelector} from "react-redux";

const useStyles = makeStyles({
    table: {
        minWidth: 600,

    },
});

//const authAxios =
function UserDetailTable({method, isSubmit, isSubmitted}) {
    const classes = useStyles();
    const [userData, setuserData] = useState([]);
    const users = useSelector((state) => state.users);
    const [flag, setFlag] = useState(null)
    console.log(users.userToken);

    axios.interceptors.request.use(
        config => {
            config.headers.authorization = 'Bearer ' + users.userToken;
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    )

    const fetchUserDetails = async () => {
        try {
            const response = await axios
                .get("http://localhost:8093/api/v1/users")
                .catch((error) => {
                    console.log("Error", error);
                });
            console.log(response)
            setuserData(response.data)

        } catch (err) {
            console.log("Error");
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchUserDetails();
    }, [isSubmit])

    const updateUser = (id) => {
        console.log(id);
        method(id)
    }
    const deleteUser = (id) => {
        console.log(id);
        /**
         *  axios.put('http://localhost:8093/api/v1/updateUser/'+value.id, userData).then(() => {
            //window.location.href('/admin');
            isSubmitted(true)
            alert("user updated");
            isSubmitted(false)
        }).catch((err) => {
            console.log(err);
        })
         */
        axios.delete('http://localhost:8093/api/v1/deleteUser/'+id).then(res => {
            isSubmitted(true)
            alert("user deleted");
            isSubmitted(false)
        }).catch((err) => {
            console.log(err)
            }
        );




    }

    return (
        <div>
            <TableContainer component={Paper} className="userdetailtable" >
                <h3>User detail Table</h3>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Full Name</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Update</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row"> {row.firstName + " " + row.lastName}</TableCell>
                                <TableCell align="right">{row.type}</TableCell>
                                <TableCell align="right">
                                    <Link onClick={ () => {updateUser(row)}}> <p>Update</p> </Link>
                                </TableCell>
                                <TableCell align="right">
                                    <Link onClick={ () => {deleteUser(row.id)}}> <p>Delete</p> </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default UserDetailTable
