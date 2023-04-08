import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserPageCSS from "./UserPage.module.css"

import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import { Button, Form, Modal } from "react-bootstrap";

import ArtPostCard from "../components/Artpost/ArtpostCard";


import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import PostCard from "../components/Post/PostCard";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;

function UserPage(props) {
  const { userId } = useParams();
  // to check the logged in account
  const { user, authenticateUser, removeToken, logOutUser } =
    useContext(AuthContext);

  //for updating the profile information
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { postId } = useParams();
  const [content, setContent] = useState("");
  const [post, setPost] = useState(null);
  const [post_image, setPost_image] = useState("");
  const [place, setPlace] = useState("");

  const [userInfo, setUserInfo] = useState();
  const [posts, setPosts] = useState([]);
  const [artPosts, setArtPosts] = useState([]);
  const [formUpdate, setFormUpdate] = useState(false);
  const [formDelete, setFormDelete] = useState(false);

  const handleName = (e) => setFullName(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const navigate = useNavigate();

  function getUserInfo() {
    axios.get(`${API_URL}/api/user/${userId}`)
      .then((response) => {
        //for catching user info to display
        setUserInfo(response.data);
        //for the updating the user information
        setFullName(response.data.fullname);
        setUsername(response.data.username);
        console.log("user info: ", response.data);
      })
      .catch((error) => console.error("error while fetching user info ", error));
  }

  function getAllPosts() {
    axios
      .get(`${API_URL}/api/home`)
      .then((response) => {
        setPosts(response.data.posts);
        setArtPosts(response.data.artPosts);
      })
      .catch((error) => console.error("error while fetching posts info ", error));
  }

  function handleUpdateSubmit(e) {
    e.preventDefault();
    const requestBody = { fullname, username };
    axios.put(`${API_URL}/api/user/${userId}`, requestBody)
      .then((response) => {
        removeToken();
        localStorage.setItem("authToken", response.data.authToken);
        authenticateUser();
      })
      .then(() => getUserInfo())
      .then(() => setFormUpdate(false))
      .catch((error) => console.error("error while updating user ",error));
  }

  function handleDelete() {
    axios.delete(`${API_URL}/api/user/${userId}/delete`)
      .then(() => navigate("/login"))
      .then(() => logOutUser());
  }

  useEffect(() => {
    getAllPosts();
    getUserInfo();
  }, []);

  return (
    <div>
      <div className={UserPageCSS.grid}>
        <div className={UserPageCSS.user_info}>
        
          <div>
            <AccountCircleIcon/>
            <p>{userInfo?.fullname}</p>
            <p>@{userInfo?.username}</p>
            <p>{userInfo?.email}</p>

            {userId === user?._id && (
              <>
                <Button variant="info">
                  Favorite <FavoriteIcon />
                </Button>

                <Button
                  variant="warning"
                  onClick={() => setFormUpdate(!formUpdate)}
                >
                  {formUpdate ? "Hide Form" : `Edit Account`}
                </Button>

                <Button variant="danger" onClick={handleDelete}>
                  Delete <DeleteOutlineIcon />
                </Button>
              </>
            )}
          </div>

          <div>
            {formUpdate && (
              <Form
                onSubmit={handleUpdateSubmit}
                style={{ backgroundColor: "white" }}
              >
                <p
                  onClick={() => setFormUpdate(false)}
                  style={{
                    backgroundColor: "#0c6dfd",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Go Back
                </p>

                <Form.Group controlId="formUsername">
                  <Form.Label>
                    <b>Username:</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={handleUsername}
                  />
                </Form.Group>

                <Form.Group controlId="formFullname">
                  <Form.Label>
                    <b>Fullname:</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={fullname}
                    onChange={handleName}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Update
                </Button>
              </Form>
            )}
          </div>
        </div>

        <div>
          <h1>Posts</h1>
        <div className={UserPageCSS.user_posts}>
          {posts.map((post) => {
            return (
              post.author?._id === userInfo?._id && (
                <PostCard key={post._id} {...post} postId={post._id} />
              )
            );
          })}
        </div>
        </div>

          <div>
          <h1>Artposts</h1>
        <div className={UserPageCSS.user_artposts}>
          {artPosts.map((artpost) => {
            return (
              artpost.author &&
              artpost.author?._id === userInfo?._id && (
                <ArtPostCard key={artpost._id} {...artpost} artpostId={artpost._id} />
              )
            );
          })}
        </div>
          </div>
      </div>
    </div>
  );
}

export default UserPage;
