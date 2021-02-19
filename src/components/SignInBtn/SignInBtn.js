import { React, useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/user';
import { signInWithGoogle } from '../../services/auth'
import './styles.css'

const SignInBtn = () => {
    const [user, setUser] = useContext(UserContext).user;

    const handleSignIn = async () => {
        let userBySignIn = await signInWithGoogle();
        if(userBySignIn) setUser(userBySignIn);
    }

    return (
        <div className="sign-in-btn" onClick={handleSignIn}>
            Sign in With Google
        </div>
    )
}

export default SignInBtn
