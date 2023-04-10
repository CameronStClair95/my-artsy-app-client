import React, { useState, useEffect, useContext } from 'react';
import CommentCSS from "./Comment.module.css"
import { Button } from 'react-bootstrap';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { AuthContext } from '../context/Auth.context';
import { useParams } from 'react-router-dom';

function Comment() {

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5005';
    const { user } = useContext(AuthContext)

    const { postId, artpostId, userId } = useParams()

    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const [userInfo, setUserInfo] = useState();

    function writeCommentHandler(e) {
        setComment(e.target.value)
    }

    function sendCommentHandler() {
        setComments((comments) => [...comments, comment])
    }

    function getInfo() {
        if (postId) {
            axios.get(`${API_URL}/api/posts/posts/${postId}`)
                .then((response) => setComments(response.data.post.postComments))
                .catch(error => console.error("error while commenting", error))
        } else if (artpostId) {
            axios.get(`${API_URL}/api/posts/artposts/${artpostId}`)
                .then((response) => {
                    console.log("response.data -> ", response.data)
                    setComments(response.data.postComments)})
                .catch(error => console.error("error while commenting", error))
        }
    }

    function handleCommentSubmit(e) {
        e.preventDefault()
        const requestBody = { comment, author: user._id }

        /* setComments([...comments, {comment, author: {username: user.username}}]); */

        if (postId) {
            axios.put(`${API_URL}/api/posts/comment/${postId}/post`, requestBody)
                .then((response) => {
                    console.log(response.data)
                    setComment("")
                    /* setComments(response.data.post.postComments) */
                })
                .then(() => getInfo())
                .catch(error => console.error("error while commenting", error))
        } else if (artpostId) {
            axios.put(`${API_URL}/api/posts/comment/${artpostId}/art`, requestBody)
                .then((response) => {
                    console.log(response.data)
                    setComment("");
                    /* setComments([...comments, response.data.post.postComments]) */
                })
                .then(() => getInfo())
                .catch(error => console.error("error while commenting", error))
        }

        setComment("")
    }

    useEffect(() => {
        console.log("information fetched")
        getInfo()
    }, [])

    return (

        <div className={CommentCSS.main_container}>

            <div className={CommentCSS.comment_input_flexbox}>

                <div>
                    <h3 className={CommentCSS.comment_title}>Write a Comment</h3>
                </div>

                <div className={CommentCSS.input_box}>
                    <form onSubmit={handleCommentSubmit} >
                        <input value={comment} onChange={writeCommentHandler} className={CommentCSS.input_box} />
                        <Button type="submit" onClick={sendCommentHandler} size='sm'>Submit <SendIcon fontSize='small' /></Button>
                    </form>
                </div>
            </div>

            {comments &&
                comments.map((oneComment, index) => {
                    return (

                        <div key={index} className={CommentCSS.comment_container}>
                            <p>{oneComment.comment}</p>
                            {/* <p>{oneComment.author.username}</p> */}
                        </div>
                    )
                })}
        </div>
    )
}

export default Comment

