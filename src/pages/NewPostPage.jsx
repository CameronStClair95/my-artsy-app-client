import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NewArtpost from '../components/NewArtpost'
import NewPost from '../components/NewPost'

function NewPostPage() {

  return (
    <div >
  <NewPost/>

{/*   <NewArtpost/> */}
    </div>
  )
}

export default NewPostPage