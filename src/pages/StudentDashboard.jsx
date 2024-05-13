import DashboardCard from "@/components/DashboardCard";
import Navbar from "../components/Navbar";
import React, { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import { app } from "../firebase";
import { checkUser } from "@/Redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";

const firestore = getFirestore(app);

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

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

  const getAllEnrolledCourses = async (user) => {
    if (!user) {
      console.log("User not authorized");
      return [];
    }

    const userRefQuery = query(
      collection(firestore, "users"),
      where("email", "==", user?.email)
    );

    console.log("inside getAllEnrolledCourse function");
    try {
      const userDocs = await getDocs(userRefQuery);
      // console.log("inside try");
      if (!userDocs.empty) {
        const userDoc = userDocs.docs[0];
        const userData = userDoc.data();
        const enrolledCourses = userData.enrolledCourses || [];

        const courseDocsPromises = enrolledCourses.map(async (course) => {
          const courseRef = doc(firestore, "Courses", course.courseRef);
          const courseDocSnapshot = await getDoc(courseRef);
          if (courseDocSnapshot.exists()) {
            const courseData = courseDocSnapshot.data();
            const courseId = courseDocSnapshot.id;

            return { ...courseData, _id: courseId, completed: course.completed };
          } else {
            console.log(
              `Course document with ID ${course.courseRef} not found.`
            );
            return null;
          }
        });

        const courseDocs = await Promise.all(courseDocsPromises);
        return courseDocs.filter((course) => course !== null);
      } else {
        console.log("User document not found.");
        return [];
      }
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  };


  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      console.log("out side fetchEnrolledCourses");
      if (user?.email) {
        console.log("fetchEnrolledCourses");
        const courses = await getAllEnrolledCourses(user);
        setEnrolledCourses(courses);
        console.log(enrolledCourses);
      }
    };

    fetchEnrolledCourses();
  }, [user]);

    if(enrolledCourses.length === 0){
    return (
      <>
      <Navbar />
      <div className="p-10 pt-10">
        <h1 className="font-semibold text-2xl ">Enrolled Courses</h1>
        <p className="text-gray-500 text-4xl">You have not enrolled in any courses yet.</p>
      </div>
    </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="p-10 pt-10">
        <h1 className="font-semibold text-2xl ">Enrolled Courses</h1>
        {enrolledCourses.map((id) => (
          <DashboardCard key={id.name} data={id} />
        ))}
      </div>
    </>
  );
};

export default StudentDashboard;
