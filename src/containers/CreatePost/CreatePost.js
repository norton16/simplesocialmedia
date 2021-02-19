import { React, useContext, useState } from 'react'
import { SignInBtn}  from '../../components'
import { UserContext } from '../../contexts/user'
import firebase from 'firebase'
import { storage, db } from '../../firebase'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import makeId from '../../helper/functions'
import './styles.css'

const CreatePost = () => {
    const [user, setUser] = useContext(UserContext).user;
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    // Photo preview
    const handleChange = (event) => {
        if(event.target.files[0]) {
            setImage(event.target.files[0]);

            const selectedImageSrc = URL.createObjectURL(event.target.files[0]);
            const imagePreview = document.getElementById("image-preview");
            imagePreview.src = selectedImageSrc;
            imagePreview.style.display = "block";
        }
    };

    const handlePost = () => {
        // Check if image is selected
        if(image) {
            // Generate string so images with same names dont get overwritten
            let imageName = makeId(10);
            // Save image to database
            const uploadTask = storage.ref(`images/${imageName}.jpg`).put(image);
            // Upload progress %
            uploadTask.on("state_changed", (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100);
                setProgress(progress);
            }, (error) => {
                console.log(error);
            }, () => {
                // Get download URL & upload post info
                storage.ref("images").child(`${imageName}.jpg`)
                .getDownloadURL()
                .then((imageUrl) => {
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        photoUrl: imageUrl,
                        username: user.email.replace("@gmail.com",""),
                        profileUrl: user.photoURL
                    })
                })
                //Clear post content after post
                setCaption('');
                setProgress(0);
                setImage(null);
                document.getElementById("image-preview").style.display = "none";
            });
        }
    };

    return (
        <div className="create-post">
            {/* Show create post form if logged in  */}
            {user
            ?
            <div className="create-post-logged-in">
                <p>Create a Post</p>
                {/* Caption text */}
                <div className="create-post-logged-in-center">
                    <textarea 
                        className="create-post-text-area" 
                        value={caption}
                        placeholder= "Write a caption!"
                        onChange={(event) => setCaption(event.target.value)} 
                        rows="3"
                    ></textarea>
                    {/* Photo preview */}
                    <div className="create-post-img-preview">
                        <img id="image-preview" alt="" />
                    </div>
                </div>
                <div className="create-post-bottom">
                    {/* Photo upload */}
                    <div className="create-post-image-upload">
                        <label htmlFor="fileInput">
                            <AddAPhotoIcon className="photo-icon" />
                        </label>
                        <input id="fileInput" type="file" accept="image/*" onChange={handleChange} />
                    </div>
                    {/* Post button */}
                    <button 
                        className="create-post-btn" 
                        onClick={handlePost} 
                        style={{color: caption ? "#000" : "lightgrey", cursor: caption ? "pointer" : ""}}>
                        {`Post ${progress != 0 ? `${progress}%` : ""}`}
                    </button>
                </div>
            </div>
            :
            <div className="sign-in-landing">
                <p>Welcome to my Social Media site.<br/>Sign in to post a picture and comment!</p> 
                <SignInBtn />
            </div>
            }
        </div>
    )
}

export default CreatePost
