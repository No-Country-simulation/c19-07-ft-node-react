import { useParams } from "react-router-dom";
import ButtonArrowBack from "../components/ButtonArrowBack";
import ClassRoomChart from "../components/ClassRoomChart";

export const TeacherReport = () => {
  const { studentId } = useParams();

  return (
    <div>
      <ButtonArrowBack />
      <h2>{studentId ? `Report for Student ID: ${studentId}` : "Loading student details..."}</h2>
      <ClassRoomChart />
      {/* <ClassRoomFeedback /> */}
    </div>
  );
};
