import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useSelector, useDispatch } from 'react-redux';
import { signupUser, signinUser } from '../Redux/slices/auth';
import { setEmail } from '../Redux/slices/auth';

import { useNavigate } from "react-router-dom";


export function Auth() {
    const navigate = useNavigate();
  //local states
  const [email, setNewEmail] = useState("");
  const [password, setPassword] = useState("");

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  // Dispatching actions
  const handleSignup = async () => {
    try{
    await dispatch(signupUser(email, password));
    dispatch(setEmail(email));
    navigate("/");
} catch (error) {
    console.error('Signup failed:', error);
    // Handle signin failure if needed
  }
  };

  const handleSignin = async () => {
    try {
        await dispatch(signinUser(email, password));
        dispatch(setEmail(email)); // Dispatch setEmail action after signin is successful
        navigate("/");
      } catch (error) {
        console.error('Signin failed:', error);
        // Handle signin failure if needed
      }
  };
  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center mt-20">
      <Tabs defaultValue="signin" className="w-[400px] border-2 border-gray-300 rounded-lg">
        <TabsList className="grid w-full grid-cols-2 bg-gray-300">
          <TabsTrigger value="signup">Sign-up</TabsTrigger>
          <TabsTrigger value="signin">Sign-in</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Make an Account</CardTitle>
              {/* <CardDescription></CardDescription> */}
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="name"
                  type="email"
                  onChange={(e) => setNewEmail(e.target.value)}
                  value={email}
                  className="border-2 border-gray-300 rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="Password">Password</Label>
                <Input
                  id="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="border-2 border-gray-300 rounded-lg"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSignup}>Sign Up</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signin">
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input
                  id="current"
                  type="email"
                  onChange={(e) => setNewEmail(e.target.value)}
                  value={email}
                  className="border-2 border-gray-300 rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">password</Label>
                <Input
                  id="new"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="border-2 border-gray-300 rounded-lg"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSignin}>Sign In</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Toaster className="border-2 border-gray-300 rounded-lg" />
    </div>
    </>
  );
}



//  //signup function
//  const signupUser = () => {
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((val) => {
//         console.log(val);
//         toast("succecsfull signup");
//       })
//       .catch((err) => {
//         console.log(err);
//         toast(" signup failed !!!!");
//       });
//   };
//   const signinUser = () => {
//     signInWithEmailAndPassword(auth, email, password)
//       .then((val) => {
//         console.log(val);
//         toast("succecsfull signin");
//       })
//       .catch((err) => {
//         console.log(err);
//         toast(" signin failed !!!!");
//         setNewEmail('');
//         setPassword('');
//       });
//   };