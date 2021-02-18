import { React, useState, useEffect } from 'react'
import { db } from '../../firebase';
import Post from '../Post/Post'
import './styles.css'

const Feed = () => {
    const [posts, setPosts] = useState([]);

    //Fetch post data when Feed loads
    useEffect(() => {
        //Changes in database will be reflected with onSnapshot
        db.collection("posts").onSnapshot((snapshot) => {
            setPosts(snapshot.docs.map((doc) => ({id: doc.id, post: doc.data()})))
        })
    }, [])

    return (
        <div className="feed">
            {posts.map(({id, post}) => {
                return <Post
                key={id}
                id={id} 
                profileUrl={post.profileUrl}
                username={post.username}
                photoUrl={post.photoUrl}
                caption={post.caption}
                comments={post.comments}
                />
            })}
        </div>
    )
}

export default Feed
