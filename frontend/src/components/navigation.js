import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import React, { useState, useEffect } from 'react';

export function Navigation() {

    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true);
        }        
    }, [isAuth]);

    return (
        <div>
        <Navbar bg="dark" variant='dark'>
            <Navbar.Brand href="/">JWT Authentication</Navbar.Brand>            
            <Nav className="me-auto"> 
                {isAuth ? <Nav.Link href="/">Home</Nav.Link> : null}
            </Nav>
            <Nav>
                {isAuth ? <Nav.Link href="/logout">Logout</Nav.Link> :  
                    <div>
                        <Navbar>
                            <Nav.Link href="/sign-up">Sign Up</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Navbar>
                    </div>
                }
            </Nav>
        </Navbar>
       </div>
    );
}
