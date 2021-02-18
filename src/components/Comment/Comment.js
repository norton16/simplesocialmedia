import React from 'react'

const Comment = ({ username, caption }) => {
    return (
        <div className="comment">
            <p>
                <span className="post-username">{`${username}`}</span>
                {caption}
            </p>
        </div>
    )
}

export default Comment
