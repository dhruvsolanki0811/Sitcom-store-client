import { useEffect } from "react";
import "./App.css";
import { Routespath } from "./Routespath";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
 
  
  return (
    <>
      <ToastContainer theme="colored"/>
      <Routespath ></Routespath>
    </>
  );
}

export default App;
