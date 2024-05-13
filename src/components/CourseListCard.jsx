import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const CourseListCard = ({ info }) => {
  console.log(info);
  return (
    <Link to={`/course/${info.id}`}>
      <div className="w-auto flex justify-around mt-6 border-2 border-gray-300 rounded-lg ">
        <div className="w-auto">
          <img src={info.thumbnail} className="w-auto h-48 rounded-lg m-2" />
        </div>
        <div className="flex flex-col m-6 flex-1">
          <div className="flex justify-between">
            <h1 className="font-bold text-2xl pl-4">{info.name} </h1>

            <Badge className={` p-2 bg-green-600`}>
              {info.enrollmentStatus ? "Open" : "Closed"}
            </Badge>
          </div>

          <br />
          <div className="flex flex-row justify-between">
            <div>
              <p className="ml-4 underline decoration-solid">Location:</p>
              <p className="ml-4 font-semibold text-lg">{info.location}</p>
            </div>
            <div>
              <p className="ml-4 underline decoration-solid">Instructor :</p>
              <p className="ml-4 font-semibold text-lg">{info.instructor}</p>
            </div>
            <div>
              <p className="ml-4 underline decoration-solid">Duration:</p>
              <p className="ml-4 font-semibold text-lg">{info.duration}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseListCard;
