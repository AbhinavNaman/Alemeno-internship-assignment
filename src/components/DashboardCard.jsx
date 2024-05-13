import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { checkUser } from "@/Redux/slices/auth";
import { app } from "../firebase";
const firestore = getFirestore(app);

const DashboardCard = ({ data }) => {
  // console.log(data);
  const [user, setUser] = useState(null);
  const [completed, setCompleted] = useState(data?.completed);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUser())
      .then((userData) => {
        if (userData) {
          setUser(userData);
          // console.log(userData);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [dispatch]);

  const markCompleted = async () => {
    console.log("button clicked");
    if (!user) {
      console.log("User not authorized");
      return;
    }
  
    const userRefQuery = query(
      collection(firestore, "users"),
      where("email", "==", user?.email)
    );
  
    try {
      const querySnapshot = await getDocs(userRefQuery);
      if (!querySnapshot.empty) {
        const userDocSnapshot = querySnapshot.docs[0]; // Get the first document snapshot
        const userData = userDocSnapshot.data();
        const userRef = doc(firestore, "users", userDocSnapshot.id);
        const enrolledCourses = userData.enrolledCourses || [];
  
        // Find the index of the object in the enrolledCourse array where courseRef matches the given value
        const index = enrolledCourses.findIndex(
          (course) => course.courseRef === data._id
        );
  
        if (index !== -1) {
          enrolledCourses[index].completed = !enrolledCourses[index].completed ;
          await updateDoc(userRef, { enrolledCourses });
          setCompleted(completed=> !completed);
          console.log("Course marked as completed successfully!");
        } else {
          console.log("Course not found in enrolled courses.");
        }
      } else {
        console.log("User document not found.");
      }
    } catch (error) {
      console.error("Error marking as completed:", error);
    }
  };
  

  return (
    <div className="flex flex-col mt-6 border-2 border-gray-300 rounded-lg p-4">
      <div className="w-auto h-fit flex justify-around  ">
        <Link to={`/course/${data._id}`}>
          <div className="w-auto ">
            <img
              src={data.thumbnail}
              className="  border-2 border-gray-300 rounded-lg m-2 w-72"
            />
          </div>
        </Link>
        <div className="flex flex-col m-4 flex-1">
          <div className="flex justify-between">
            <div className="">
              <Link to={`/course/${data._id}`}>
                <h1 className="font-bold text-2xl">{data.name} </h1>
              </Link>

              <Badge className={completed ? "bg-green-600" : "bg-red-600"}>
                {completed ? "Completed" : "Not Completed"}
              </Badge>
            </div>
            <Button className={completed ? "w-40 bg-red-500" : "w-40 bg-green-500"} onClick={markCompleted}>
            {completed ? "Unmark as Completed" : "Mark as Completed"}
            </Button>
          </div>

          <br />
          <div className="flex flex-row justify-between">
            <div>
              <p className="underline decoration-solid">Due date:</p>
              <p className=" font-semibold text-lg">{data.schedule}</p>
            </div>
            <div className="">
              <p className="underline decoration-solid mr-20">Instructor :</p>
              <p className="font-semibold text-lg">{data.instructor}</p>
            </div>
          </div>
        </div>
      </div>
      <Progress value={33} className="m-4 w-auto border-2 border-gray-300" />
    </div>
  );
};

export default DashboardCard;
