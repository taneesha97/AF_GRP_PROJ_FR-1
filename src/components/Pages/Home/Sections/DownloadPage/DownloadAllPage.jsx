import React, {useEffect, useState} from 'react'
import './DownloadAllPage.scss';
import DownloadComponent from './DownloadComponent/DownloadComponent';
import CategoryForm from "./CategoryForm/CategoryForm";
import {useSelector} from "react-redux";
import axios from "axios";
import {Container, TextField, Typography} from "@material-ui/core";
import {useHistory} from "react-router";
function DownloadAllPage() {

    const [categoryData, setCategoryData] = useState([]);
    const history = useHistory();
    const users = useSelector((state) => state.users);
    const [flag, setFlag] = useState(null)
    const [isSubmited, setIsSubmitted] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const fetchDownloadCategoryDetails = async () => {
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
        fetchDownloadCategoryDetails();
    }, [isSubmited])

    // Add this to protected Components to avoid unauthorized users from comming.

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
        <div className="downloadallpage">
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
            <h1 className="downloadallpage-header">All Download page</h1>
            <div className="download-category-form">
                <CategoryForm isSubmitted = {setIsSubmitted}/>
            </div>
            <div className="alldownloadlist">
                <div className="alldownloadrow">
                    {categoryData.filter((val) => {
                        if(searchTerm === ""){
                        return val
                    } else if(val.downloadHeader.toLowerCase().includes(searchTerm.toLowerCase())){
                        return val
                    }
                    }).map((row) => (
                        console.log(row),
                        <DownloadComponent header={row.downloadHeader} description={row.downloadDescription}/>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default DownloadAllPage
