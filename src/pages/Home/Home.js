import React from 'react'
import { Navbar, CreatePost, Feed } from '../../containers'
import './styles.css'

const Home = () => {
    return (
        <div className="home">
            <Navbar />
            <CreatePost />
            <Feed />
        </div>
    )
}

export default Home
