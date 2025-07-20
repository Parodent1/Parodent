import React from 'react'
import './navBar.css'
import { useAuth } from '../../context/AuthContext'

function NavBar() {

    const {user , isAuthenticated } = useAuth();

    return (
    <div className='navbarBody'>
        <div className="navLBtn">
            <button className="navBtn">всі пацієнти</button>
            <button className="navBtn">персонал</button>
            <button className="navBtn">календар</button>            
        </div>
        <div className="navRBtn">
            <button className="navBtn greenBtn">створити запис</button>
            {isAuthenticated ? 
            <button className="navBtn">{user.firstname + ' ' + user.lastname}</button>
            :(
            <button className="navBtn">Guest</button>
            )}
            <div className="profileLogo"></div>
        </div>
    </div>
)
}

export default NavBar