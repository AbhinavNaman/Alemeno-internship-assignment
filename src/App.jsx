import React, {useState, useEffect} from 'react';
import StudentDashboard from "./pages/StudentDashboard"
import CourseList from "./pages/CourseList"
import CourseDetail from "./pages/CourseDetail"
import { Auth } from "./pages/Auth"
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkUser } from "@/Redux/slices/auth";



const router = createBrowserRouter([
  {
    path: "/",
    element: <CourseList/>,
    errorElement: <div>Error</div>
  },
  {
    path: "/dashboard",
    element: <StudentDashboard/>,
    errorElement: <div>Error</div>
  },
  {
    path: "/course/:id",
    element: <CourseDetail/>,
    errorElement: <div>Error</div>
  },
  {
    path: "/auth",
    element: <Auth/>,
    errorElement: <div>Error</div>
  },
  
]);

function App() {
  const dispatch = useDispatch();
  
  
  useEffect(()=>{
    dispatch(checkUser())
  },[])
  
  const email = useSelector((state) => state.auth.email);
  // console.log(email)
  // console.log("------------>",data);
  
  return (
    <>
    <div className="px-20">
      
      <RouterProvider router={router} />
    </div>
    </>
  )
}

export default App
