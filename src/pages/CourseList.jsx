import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import Navbar from "../components/Navbar";
import { CarouselSpacing } from "../components/CarouselSpacing";
import CourseListCard from "../components/CourseListCard";
import { getAllCourses } from '../Redux/slices/courses';

const CourseList = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getAllCourses();
        setData(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses based on searchValue
  const filteredCourses = data.filter(course => {
    const { name, instructor } = course;
    return name.toLowerCase().includes(searchValue.toLowerCase()) ||
           instructor.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <>
      <Navbar />
      <div className='ml-10 mr-10'>
        <CarouselSpacing data={data}/>

        <div className="p-10 pt-0">
          <h1 className="font-semibold text-2xl m-4">Courses</h1>
          <Input
            type="text"
            placeholder="Search by name or instructor"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className="border-2 border-gray-300 rounded-lg"
          />
          {filteredCourses.map((info, index) => (
            <CourseListCard key={index} info={info} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseList;
