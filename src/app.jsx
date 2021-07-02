import React, {useState} from 'react';
import Register from './components/Register/Register';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Navbar from "./components/Navigation/Navbar";
import Login from "./components/Login/Login";
import './App.css';
import EventPage from "./components/Pages/Home/Sections/EventPage/EventPage";
import Home from './components/Pages/Home/Home';
import LoginPage from './components/Pages/LoginPage/LoginPage';
import PaymentPage from "./components/Pages/PaymentPage/PaymentPage";
import DownloadAllPage from './components/Pages/Home/Sections/DownloadPage/DownloadAllPage';
import DownloadLinkPage from './components/Pages/Home/Sections/DownloadPage/DownloadLinkPage';
import AdminPage from './components/Pages/AdminPage/AdminPage';
import {ProtectedRoute} from "./components/Login/ProtectedRoutes/protectedRoute";

import TestingEmptyComponent from "./components/TestingEmptyComponent/ProtectedEmptyComponent";
import EventMainPage from "./components/Pages/EventPage/EventMainPage";
import FeedBackAllPage from "./components/Pages/FeedBackPage/FeedBackAllPage";
import AdminLoginPage from "./components/Pages/AdminLoginPage/AdminLoginPage";
import KeySpeakerAllPage from "./components/Pages/Home/Sections/SpeakersPage/KeySpeakerAllPage";


const App = () => {
//Add the React Router And Create Routing
        return (
                <BrowserRouter>
                    <Navbar/>
                    <Switch>
                    <Route path = "/" exact component={Home}/>
                    <Route path = "/register" component={Register}/>
                    <Route path = "/loginpage" component={LoginPage}/>
                    <ProtectedRoute exact path = "/services" component={TestingEmptyComponent}/>
                    <Route path = "/alldownloadPage" component={DownloadAllPage}/>
                    <Route path = "/payment/:value" component={PaymentPage}/>
                    <Route path = "/alldownloadlinkpage/:value" component={DownloadLinkPage}/>

                    <Route exact path  = "/admin" component={AdminPage}/>
                    <Route exact path  = "/eventpage" component={EventMainPage}/>
                    <ProtectedRoute exact path = "/empty" component={TestingEmptyComponent}/>

                    <Route path = "/admin" component={AdminPage}/>
                    <Route path = "/allFeedbackPage" component={FeedBackAllPage}/>
                    <Route path = "/payment" component={FeedBackAllPage}/>
                    <Route path = "/allKeySpeakerPage" component={KeySpeakerAllPage}/>
                    <Route path = "/adminlogin" component={AdminLoginPage}/>

                    </Switch>
                </BrowserRouter>
        )  
}
export default App;
