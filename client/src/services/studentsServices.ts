import axios from "axios";
import endpoints from "./endpoints";

export const getStudents = async () => {
    try {
        const { data } = await axios.get(endpoints.students);
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}


export const getAStudent = async (studentId) => {
    try {
        const { data } = await axios.get(endpoints.studentById(studentId));
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}