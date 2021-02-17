import React from 'react'
import { Navbar, CreatePost } from '../../containers'
import './styles.css'

const Home = () => {
    return (
        <div className="home">
            <Navbar />
            <CreatePost />
        </div>
    )
}

export default Home
