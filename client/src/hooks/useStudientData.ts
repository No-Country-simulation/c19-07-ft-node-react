import axios from "axios";

//Student id for practice: clyop7zii00098liz1pizdksj
// https://hostingname/api/students/clyop7zii00098liz1pizdksj

export const useStudientData = () => {

    const urlBase = `https://hostingName/api/`;

    const getStudentData = async () => {
        const studentUrl = urlBase + `students/clyop7zii00098liz1pizdksj`;
        try {
          const response = await axios.get(studentUrl);
          return response.data; 
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      };


  return (
    getStudentData
  )
}


