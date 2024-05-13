import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { logout, checkUser } from "../Redux/slices/auth";
import { app } from "../firebase";
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { authenticateFailure } from "../Redux/slices/auth"; // Import authenticateFailure action creator

const auth = getAuth(app);

const Navbar = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // console.log(user.email);
            setUser(user.email);
          } else {
            dispatch(authenticateFailure("User not found")); // Dispatch authenticateFailure action if user not found
            setUser(null); // Clear user state
          }
        });
      } catch (error) {
        console.log(error);
        dispatch(authenticateFailure(error.message)); // Dispatch authenticateFailure action if error occurs
        setUser(null); // Clear user state
      }
    };

    fetchUser();
  }, [dispatch]); // Added dispatch as a dependency

  return (
    <div className="flex justify-between pt-4 pb-4">
      <div className="font-bold text-4xl flex ">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="px-4">Coursera</p>
      </div>
      <div>
        {"welcome "}
        {user}
      </div>
      <div className="flex justify-around">
        <NavLink to="/">
          <Button className="mx-4" variant="ghost">
            Home
          </Button>
        </NavLink>
        {user && (
          <NavLink to="/dashboard">
            <Button className="mx-4" variant="ghost">
              Dashboard
            </Button>
          </NavLink>
        )}

        <div>
          {user ? (
            <Button
              className="mx-4"
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
            >
              Logout
            </Button>
          ) : (
            <Button className="mx-4" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
