import axios from 'axios'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'

function ConfirmationPage() {

    
  const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;

    const {userId} = useParams()
    const navigate = useNavigate()

    function handleDelete(){
        console.log(`Deleting the user with id: ${userId}`)

        axios.delete(`${API_URL}/user/${userId}`)
        .then((response) => {
            console.log("user deleted successfully", response.data)
            navigate("/")
        })
        .catch((error) => {
            console.log("FE error while deleting user", error)
        })
    }

  return (
    <div>
    are you sure you want to delete your account? This proccess is irreversible. 😱
    <Link to={`/user/${userId}`}><Button variant="success">Go back</Button></Link>
    <Button variant="danger" onClick={handleDelete}>Delete Account</Button>
    </div>
  )
}

export default ConfirmationPage