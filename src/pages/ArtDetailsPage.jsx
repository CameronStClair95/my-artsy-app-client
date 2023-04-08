import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ArtpostCSS from "../components/Artpost/artpost.module.css"
import { Button, Form, Modal } from "react-bootstrap";
import { AuthContext } from "../context/Auth.context";
import Comment from "../components/Comment"

function ArtPostDetails() {
  const { artpostId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";
  const [artpost, setArtPost] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [medium, setMedium] = useState("");
  const [year, setYear] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [art_image, setArtImage] = useState("");
  const [artImageFile, setArtImageFile] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/posts/artposts/${artpostId}`)
      .then((response) => {
        console.log(response.data);
        setArtPost(response.data);
      })
      .catch((error) => console.log(error));
  }, [artpostId]);

  const uploadImage = (file) => {
    const formData = new FormData();
    formData.append("art_image", file);
  
    return axios
      .post(`${API_URL}/api/posts/artposts/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        return response.data.url;
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        return null;
      });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
  
    let updatedArtImage = art_image;
    if (artImageFile) {
      updatedArtImage = await uploadImage(artImageFile);
    }

    axios
      .put(`${API_URL}/api/posts/artposts/${artpostId}`, {
        artist,
        title,
        description,
        medium,
        year,
        dimensions,
        art_image: updatedArtImage,
      })
      .then((response) => {
        setArtPost(response.data);
        console.log(response)
        setShowUpdateForm(false);
      })
      .catch((error) => {
        console.error("Error updating artpost:", error);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`${API_URL}/api/posts/artposts/${artpostId}`)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error deleting artpost:", error);
      });
    setShowDeleteConfirmation(false);
  };

  return (
    <div className={ArtpostCSS.artpost_details_div}>
      {artpost ? (
        <div>
          <h2>Art Details:</h2>
          <div className={ArtpostCSS.artpost_card}>

            <div className={ArtpostCSS.art_image_div}>
              <img className={ArtpostCSS.art_image} 
                  src={artpost.art_image} alt={artpost.title} />
            </div>

            <div className={ArtpostCSS.artpost_content}>
              <h3>{artpost.title}</h3>
              <h5>{artpost.artist}, {artpost.year}</h5>
              {artpost.medium && <h6>Medium: {artpost.medium}</h6>}
              {artpost.description && <p>Description: {artpost.description}</p>}
            </div>
            
           
          {user?._id === artpost.author && (
            <>
              <Button onClick={() => setShowUpdateForm(!showUpdateForm)}>
                {showUpdateForm ? "Hide Form" : "Edit Art Post"}
              </Button>
  
              <Button
                variant="danger"
                onClick={() =>
                  setShowDeleteConfirmation(!showDeleteConfirmation)
                }
              >
                Delete
              </Button>
            </>
          )}
          </div>

          <div>
      <Comment/>
            </div>
          {showUpdateForm && (
            <Form onSubmit={handleUpdateSubmit}>
              <Form.Group controlId="formArtist">
                <Form.Label>Artist:</Form.Label>
                <Form.Control
                  type="text"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                />
              </Form.Group>
  
              <Form.Group controlId="formTitle">
                <Form.Label>Title:</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
  
              <Form.Group controlId="formDescription">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
  
              <Form.Group controlId="formMedium">
                <Form.Label>Medium:</Form.Label>
                <Form.Control
                  type="text"
                  value={medium}
                  onChange={(e) => setMedium(e.target.value)}
                />
              </Form.Group>
  
              <Form.Group controlId="formYear">
                <Form.Label>Year:</Form.Label>
                <Form.Control
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </Form.Group>
  
              <Form.Group controlId="formDimensions">
                <Form.Label>Dimensions:</Form.Label>
                <Form.Control
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                />
              </Form.Group>
  
              <Form.Group controlId="formArtImage">
                <Form.Label>Art Image:</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => setArtImageFile(e.target.files[0])}
                />
              </Form.Group>
  
              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
      )}
      <Modal
          show={showDeleteConfirmation}
          onHide={() => setShowDeleteConfirmation(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Art Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this art post?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteConfirmation(false)}
            >
              Close
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      
    ) : (
      <p>Loading art details...</p>
    )}
  </div>
);
}

export default ArtPostDetails;