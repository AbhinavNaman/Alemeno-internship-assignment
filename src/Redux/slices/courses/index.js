import { createSlice } from '@reduxjs/toolkit'
import { getFirestore, collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";
import { app } from "../../../firebase";
import courses from '@/data';

const firestore = getFirestore(app);

const initialState = {
  value: 0,
}

export const courseSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   authenticate: (state) => {
     state.value += 1
   }
  },
})

export const getCourse = async (courseId)=>{
  const ref = doc(firestore, "Courses", courseId);
  const snap = await getDoc(ref);

  if(snap.exists()){
    return {id: snap.id, ...snap.data()};
  }
  else{
    console.log(" no data found");
    return null;
  }
}

export const getAllCourses = async () => {
  const querySnapshot = await getDocs(collection(firestore, 'Courses'));
  const coursesData = querySnapshot.docs.map(doc => ({
    id: doc.id, // Include the document ID
    ...doc.data() // Include the document data
  }));

  return coursesData;
};


export const {  authenticate } = courseSlice.actions

export default courseSlice.reducer