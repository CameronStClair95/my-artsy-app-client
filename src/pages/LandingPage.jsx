import React from 'react'
import { Link} from 'react-router-dom';

function LandingPage() {
  return (
    <div>
        Landing Page
    <Link to={"/home"}><button>Home</button></Link>

    </div>
  )
}

export default LandingPage