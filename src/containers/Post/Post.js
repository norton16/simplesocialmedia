import { React, useState, useContext } from 'react'
import { Comment, CommentInput } from '../../components'
import { UserContext } from '../../contexts/user'
import { db, storage } from '../../firebase'
import './styles.css'

const Post = ({profileUrl, username, id, photoUrl, caption, comments}) => {
    const [user, setUser] = useContext(UserContext).user;

    // Delete post from firebase
    // 1. Delete image from firebase storage
    const deletePost = () => {
        var imageRef = storage.refFromURL(photoUrl);
        imageRef.delete().then(() => {
            console.log("Delete successful")
        }).catch((error) => {
            console.log(`Error: ${error}`);
        });

        // 2. Delete post info from firebase storage
        db.collection("posts").doc(id).delete().then(() => {
            console.log("Delete post successful")
        }).catch((error) => {
            console.log(`Error: ${error}`);
        });
    }
    

    return (
        <div className="post">
            <div className="post-header">
                <div className="post-header-left">
                    <img className="post-profile-img" src={profileUrl} />
                    <p>{username}</p>
                </div>
                {user ? <button onClick={deletePost} className="post-delete-btn">Delete</button> : <></>}
            </div>
            <div className="post-center">
                <img src={photoUrl} />
            </div>
            <div>
                <p>
                    <span className="post-username">{`${username}`}</span>
                    {caption}
                </p>
            </div>

            { comments 
                ? (comments.map((comment) => { return (<Comment username={comment.username} caption={comment.comment} />); }))
                : (<></>)
            }

            {user ? <CommentInput comments={comments} id={id}/> : <></>}
        </div>
    )
}

export default Post
