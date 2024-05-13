import React, { useState, useEffect } from "react";
import { AccordionDemo } from "@/components/AccordionDemo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { getCourse } from "@/Redux/slices/courses";
import { checkUser } from "@/Redux/slices/auth";

import {
  addDoc,
  collection,
  updateDoc,
  doc,
  arrayUnion,
  getFirestore,
  query, where, getDocs
} from "firebase/firestore";

import { app } from "../firebase";

import { useDispatch, useSelector } from "react-redux";
const firestore = getFirestore(app);

const CourseDetail = () => {
  const [user, setUser] = useState();
  const [data, setData] = useState([]);
  const [enrolled, setEnrolled] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCourse(params.id);
      // console.log(response);
      setData(response);
    };
    fetchData();

    // Fetch user data
    dispatch(checkUser())
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  
  const handleEnroll = async () => {
    setEnrolled(enrolled => !enrolled)
    if (!user) {
      // User is not authenticated
      console.log("user not authorized");
      return;
    }
  
    const userRefQuery = query(
      collection(firestore, "users"),
      where("email", "==", user?.email)
    );
  
    try {
      const querySnapshot = await getDocs(userRefQuery);
      if (!querySnapshot.empty) {
        // Assuming there's only one user with the given email address
        const userDoc = querySnapshot.docs[0];
        const userRef = doc(firestore, "users", userDoc.id);
        await updateDoc(userRef, {
          enrolledCourses: arrayUnion({ courseRef: data?.id, completed: false }),
        });
        console.log("Course enrolled successfully!");
      } else {
        console.log("No user found with the provided email address.");
      }
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center border-2 border-gray-300 rounded-lg m-4 p-10 ml-10 mr-10">
        <div className="w-auto h-fit flex justify-between  ">
          <div className="w-auto ">
            <img src={data?.thumbnail} className="  rounded-lg m-2 w-full" />
          </div>
          <div className="flex flex-col m-2">
            <div className="flex justify-start">
              <h1 className="font-bold text-2xl pl-4">{data?.name} </h1>

              <Badge
                className={` p-2 inline-block whitespace-no-wrap max-w-max ml-4 bg-green-600`}
              >
                {data?.enrollmentStatus ? "Open" : "Closed"}
              </Badge>
            </div>

            <br />
            <p className="ml-4 underline decoration-solid">Instructor :</p>
            <p className="ml-4 font-semibold text-lg">{data?.instructor}</p>
            <br />
            <p className="ml-4 underline decoration-solid">Schedule:</p>
            <p className="ml-4 font-semibold text-lg">{data?.schedule} </p>
          </div>
          <div className="flex flex-col mr-6">
            {/* <Button className="m-4 w-40 bg-cyan-400">View</Button> */}
            <Button
              className={enrolled ? "m-2 mb-4 bg-blue-500 w-36": "m-2 mb-4 bg-green-500 w-36"}
              onClick={handleEnroll}
            >
              {enrolled ? "Enrolled !" : "Enroll"}

            </Button>
            <p className="ml-2 underline decoration-solid">Location:</p>
            <p className="ml-2 font-semibold text-lg">{data?.location}</p>
            <br />
            <p className="ml-2 underline decoration-solid">Duration:</p>
            <p className="ml-2 font-semibold text-lg">{data?.duration}</p>
          </div>
        </div>
        <div className="m-4">
          <h2 className="font-semibold text-lg underline decoration-solid">
            Description:
          </h2>
          <p> {data?.description}</p>
        </div>

        <div className="m-4">
          <h2 className="font-semibold text-lg underline decoration-solid">
            Pre-requisites :
          </h2>
          <div className=" flex">
            {data?.prerequisites?.map((x) => (
              <Badge
                key={x} // Make sure to provide a unique key
                className={`mt-6 p-2 px-4 inline-block whitespace-no-wrap max-w-max ml-4 bg-green-600`}
              >
                {x}
              </Badge>
            ))}
          </div>
        </div>

        <div className="m-4">
          <h2 className="font-semibold text-lg underline decoration-solid">
            Syllabus:
          </h2>
          {data?.syllabus?.map((syllabusItem, index) => (
            <AccordionDemo key={index} data={syllabusItem} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
