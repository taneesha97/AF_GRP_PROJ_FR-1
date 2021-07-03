import React, {useEffect, useState} from 'react';
import './downloadstyles.css';
import {BrowserRouter as Router, useHistory} from 'react-router-dom';
import DownloadComponent from "./DownloadComponent/DownloadComponent";
import axios from "axios";

function DownloadSection() {

    const history = useHistory();
    const [categoryData, setCategoryData] = useState([]);

    const handleHistory = () => {

        history.push('/alldownloadPage');
    }

    const fetchDownloadCategoryDetails1 = async () => {
        try {
            const response = await axios
                .get("https://application-framework-database.herokuapp.com/api/v1/categories")
                .catch((error) => {
                    console.log("Error", error);
                });
            setCategoryData(response.data)

        } catch (err) {
            console.log("Error");
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchDownloadCategoryDetails1();
    }, [])

    return (
        <div className = "download-main-container download">
            <div className="header">
                
                <button className="download-main-container-download-button" onClick ={(e) => {
                        e.preventDefault();
                        handleHistory();
                    }}>View All</button>

                <h3 className="main">Download Page</h3>
                <p className="second">information</p>
            </div>
            <div className="cardLayout">
                {categoryData.slice(0,4).map((row) => (
                    console.log(row),
                        <DownloadComponent header={row.downloadHeader} description={row.downloadDescription}/>
                ))}
            </div>
    </div>)
}
export default DownloadSection;
