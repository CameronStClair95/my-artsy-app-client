import React, { useState, useEffect, useContext } from 'react';
import CommentCSS from "./Comment.module.css"
import { Button } from 'react-bootstrap';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { AuthContext } from '../context/Auth.context';
import { useParams } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';

let relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)


function Comment({author}) {

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
                .then((response) => {setComments(response.data.postComments)})
                .catch(error => console.error("error while commenting", error))
        }
    }

    function handleCommentSubmit(e) {
        e.preventDefault()
        const requestBody = { comment, author: user._id }

        if (postId) {
            axios.put(`${API_URL}/api/posts/comment/${postId}/post`, requestBody)
                .then(() => {setComment("")})
                .then(() => getInfo())
                .catch(error => console.error("error while commenting", error))
        } else if (artpostId) {
            axios.put(`${API_URL}/api/posts/comment/${artpostId}/art`, requestBody)
                .then(() => {setComment("")})
                .then(() => getInfo())
                .catch(error => console.error("error while commenting", error))
        }
        setComment("")
    }

    useEffect(() => {
        getInfo()
    }, [])

    return (

        <div className={CommentCSS.main_container}>

            <div className={CommentCSS.comment_input_flexbox}>

                <div>
                    <h3 className={CommentCSS.comment_title}>Write a Comment</h3>
                </div>

                <div>
                    <form onSubmit={handleCommentSubmit} className={CommentCSS.form_box}>
                        <input maxLength={200} value={comment} onChange={writeCommentHandler} className={CommentCSS.input_box}/>
                        <Button type="submit" onClick={sendCommentHandler} size='sm'>Submit <SendIcon fontSize='small' /></Button>
                    </form>
                </div>
            </div>

            <div className={CommentCSS.all_comments}>
            {comments &&
                comments.map((oneComment, index) => {
                    return (
                        <div key={index} className={CommentCSS.comment_container}>
                            <p>{oneComment.comment}</p>

                            <div className={CommentCSS.timestamp}>
                                <p className={CommentCSS.timestamp_time}>{dayjs(oneComment.createdAt).fromNow()}</p>
                            </div>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Comment

