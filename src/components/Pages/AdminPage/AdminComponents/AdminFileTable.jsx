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
import {Link} from "@material-ui/core";

import useFirestore from "../../../../Firebase/useFirestore";

const useStyles = makeStyles({
    table: {
        minWidth: 1350,
    },
});



function AdminFileTable() {
    const classes = useStyles();
    const { docs } = useFirestore('images');


    const approve = (id) => {
        let value = "approve";
        console.log(value);
        console.log(id);
    }
    const decline = (id) => {
        let value = "decline";
        console.log(value);
        console.log(id);
    }
    return (
        <div>
            <TableContainer component={Paper} className="editorcontent" >
                <h1>Admin File Table</h1>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" scope="row">File Name</TableCell>
                            <TableCell align="right">File Type</TableCell>
                            <TableCell align="right">Crated Date</TableCell>
                            <TableCell align="right">Download Link</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {docs.map((row) => (
                                <TableRow key={row}>
                                <TableCell component="th" scope="row"> {row.name}</TableCell>
                                <TableCell align="right">{row.type}</TableCell>
                                <TableCell align="right">date</TableCell>
                                <TableCell align="right">
                                    <button className="download-file-button">
                                        {/*<Link to={row.url} target="_blank" download>Download</Link>*/}
                                        <a href={row.url} download={row.name}> Download Here </a>
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default AdminFileTable
