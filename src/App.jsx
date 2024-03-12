import { useDispatch , useSelector } from "react-redux"
import { useNavigate, useRoutes } from "react-router-dom";
import route from "./route";
import { useEffect, useState } from "react";
import { userDetails } from "./redux/user/user-actions";
function App() {


  // const dispatch = useDispatch();
  // const myState = useSelector((state) => state.user);

  const token = localStorage.getItem("accessToken");

  // const navigate = useNavigate();
  // const [state , setState] = useState();
  // const [token , setToken] = useState(null);

  // useEffect(() => {
  //   setToken(localStorage.getItem("accessToken"));
  //   if(!token){
  //     setToken(false);
  //   }
  //   if(token){
  //     dispatch(userDetails())
  //   }
  // },[token])


  // useEffect(() => {
  //   if (myState !== undefined) {
  //     setState(myState);
  //   }
  // }, [myState]);

  const routing = useRoutes(route(!token ? false : token));
  return routing;  

}

export default App
