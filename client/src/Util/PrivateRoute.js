import React from 'react'
import { Navigate} from 'react-router-dom';

const PrivateRoute = ({children}) => {
  const isLogin = localStorage.getItem('isLogin');

  console.log(isLogin);

  if(isLogin && isLogin === "true"){
    console.log("user are login");
    return children;
  }else{
       return <Navigate to={"/"}/>;
  }

    // return isLogin === true ? children : nav('/');

    
  

}

export default PrivateRoute;
