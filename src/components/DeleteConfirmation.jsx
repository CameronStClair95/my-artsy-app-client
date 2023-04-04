import React from 'react'
import { Button, Modal } from 'react-bootstrap'

function DeleteConfirmation(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>

                        <Modal.Header closeButton><Modal.Title id="contained-modal-title-vcenter">Confirm to delete your Account</Modal.Title></Modal.Header>
                        
                        <Modal.Body>
                            <h4>Are you sure you want to delete your account? This process is irreversible. 😱</h4>
                            <p>
                            If you delete your account, you will loose access to all your posts and artposts, and can't update them in the future even with another account. Think wisely, and twice 🫤
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                        
                            <Button onClick={props.onHide}>Close</Button>
                        </Modal.Footer>
                    </Modal>
  )
}

export default DeleteConfirmation