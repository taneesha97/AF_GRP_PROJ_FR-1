import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import {Button} from "../Button/Button";
import './Navbar.css'
import {useDispatch} from "react-redux";
import {logoutUser} from "../../actions/users";

function Navbar () {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const  handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const dispatch = useDispatch();

    const showButton = () => {
        if(window.innerWidth <= 960){
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(()=> {
        showButton();
    }, [])

    window.addEventListener('resize', showButton);

    const logout = () => {
        const user = {
            "userName": null,
            "userToken": null,
            "userType": null
        }
        dispatch(logoutUser(user));
        localStorage.setItem('userName', user.userName);
    }

    return (
        <React.Fragment>
            <nav className= "navbar">
                <div className= "navbar-container">
                    <Link to = "/" className ="navbar-logo" onClick={closeMobileMenu}>
                        HOME <i className= "fa fa-university"/>
                    </Link>
                    <div className = "menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className= "nav-item">
                            <Link to= '/' className ="nav-links" onClick={closeMobileMenu}>
                                HOME
                            </Link>
                        </li>
                        <li className= "nav-item">
                            <Link to= '/eventpage' className ="nav-links" onClick={closeMobileMenu}>
                                EVENTS
                            </Link>
                        </li>
                        <li className= "nav-item">
                            <Link to= '/loginpage' className ="nav-links" onClick={closeMobileMenu}>
                                LOGIN
                            </Link>
                        </li>
                        <li className= "nav-item">
                            <Link to= '/register' className ="nav-links" onClick={closeMobileMenu}>
                                REGISTRATION
                            </Link>

                        </li>
                    </ul>
                    { button  && <Button onClick={() => logout()} buttonStyle= "btn--outline"> LOG OUT </Button>}
                    <Link to= '/adminlogin' className ="nav-links" onClick={closeMobileMenu}>
                        ADMIN
                    </Link>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default Navbar;
