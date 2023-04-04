import { useContext } from "react";
import { AuthContext } from "../../context/Auth.context";
import { Navigate } from "react-router-dom";

function IsPrivate( { children } ) {
  // IsPrivate used to see components only when logged in
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // If the authentication is still loading 
  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn) {
  // If the user is not logged in 
    return <Navigate to="/login" />;
  } else {
  // If the user is logged in, allow to see the page 
    return children;
  }
}

export default IsPrivate;