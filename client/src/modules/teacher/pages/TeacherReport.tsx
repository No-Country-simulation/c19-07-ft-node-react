import ButtonArrowBack from "../components/ButtonArrowBack";
// import ClassRoomChart from "../components/ClassRoomChart";
import GeneratePdfDocument from "../components/GeneratePdfDocument"

export const TeacherReport = () => {
  return (
    <div>
      <ButtonArrowBack />
      <GeneratePdfDocument/>
      {/* <ClassRoomChart /> */}
    </div>
  );
};
