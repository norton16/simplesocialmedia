import { React, useState, useContext } from 'react'
import { UserContext } from '../../contexts/user'
import { db } from '../../firebase';
import './styles.css'

const CommentInput = ({ comments, id }) => {

    const [user, setUser] = useContext(UserContext).user;
    const [comment, setComment] = useState('');
    const [commentArray, setCommentArray] = useState(comments ? comments : []);

    // Add comment to post
    const addComment = () => {
        if(comment != "") {
            commentArray.push({
                comment: comment,
                username: user.email.replace("@gmail.com","").toLowerCase()
            });

            db.collection("posts")
            .doc(id)
            .update({
                comments: commentArray
            }).then(() => {
                setComment("");
                console.log("Comment added");
            }).catch((error) => {
                console.log(`Error ${error}`);
            });
        }
    }

    return (
        <div className="comment-input">
            <textarea
            className="comment-input-textarea"
            placeholder="Write a comment..."
            rows="1"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            >
            </textarea>
            <button onClick={addComment}>Comment</button>
        </div>
    )
}

export default CommentInput
