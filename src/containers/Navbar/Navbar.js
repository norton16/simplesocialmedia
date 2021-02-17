import { React, useContext } from 'react'
import { SignInBtn } from '../../components/'
import { UserContext } from '../../contexts/user'
import './styles.css'

const Navbar = () => {
    const [user, setUser] = useContext(UserContext).user;

    return (
        <div className="navbar">
            <h2>Social Media</h2>
            {/* Show user image if logged in */}
            {user ? <img className="navbar-img" src={user.photoURL}/> : <SignInBtn />}
        </div>
    )
}

export default Navbar
