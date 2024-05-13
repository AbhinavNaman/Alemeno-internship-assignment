// redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, } from 'firebase/auth';
import { app } from "../../../firebase";
import { toast } from "sonner";
import { getFirestore, collection, addDoc } from "firebase/firestore";


// Firebase instance
const auth = getAuth(app);
const firestore = getFirestore(app);

// Define initial state
const initialState = {
  email: '',
  password: '',
  isAuthenticated: false,
  error: null,
};

// Create auth slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    authenticateSuccess: (state) => {
      state.isAuthenticated = true;
      state.error = null;
    },
    authenticateFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Export action creators
export const {
  setEmail,
  setPassword,
  authenticateSuccess,
  authenticateFailure,
} = authSlice.actions;

// Async action creator for user signup
export const signupUser = (email, password) => async (dispatch) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    dispatch(authenticateSuccess());
    dispatch(setEmail(email));
    await dispatch(addUserData(email));
    toast("Successful signup");
    return userCredential;
  } catch (error) {
    dispatch(authenticateFailure(error.message));
    toast("Signup failed");
    throw error;
  }
};

// Async action creator for user signin
export const signinUser = (email, password) => async (dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    dispatch(authenticateSuccess());
    dispatch(setEmail(email));
     toast("Successful signin");

    return userCredential;
  } catch (error) {
    dispatch(authenticateFailure(error.message));
    toast("Signin failed");
    throw error;
  }
};


export const checkUser = () => async (dispatch) => {
  try {
    // Use a promise-based approach to handle asynchronous code
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Dispatch actions for successful authentication
          dispatch(setEmail(user.email));
          dispatch(authenticateSuccess());
          resolve(user); // Resolve the promise with the user data
        } else {
          // Dispatch action for authentication failure
          dispatch(authenticateFailure("User not authenticated"));
          resolve(null); // Resolve with null since user is not authenticated
        }
      }, (error) => {
        // Handle any errors that occur during authentication
        dispatch(authenticateFailure(error.message));
        reject(error); // Reject the promise with the error
      });
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error checking user:", error);
    dispatch(authenticateFailure("Unexpected error"));
    throw error; // Rethrow the error to be caught elsewhere if necessary
  }
};


export const addUserData =(email)=> async (dispatch) =>{
  try {
    console.log("inside addUserData");
    const collectionRef = collection(firestore, "users");
    await addDoc(collectionRef, {
      email: email,
      enrolledCourses:[],
    });
  } catch (error) {
    console.log(error);
  }
}

export const logout = () => async (dispatch) =>{
  try {
    signOut(auth);
    dispatch(setEmail(''));
    dispatch(setPassword(''));
    console.log("logged out");
  } catch (error) {
    console.log(error);
  }
}

// Export the reducer
export default authSlice.reducer;
