import { useEffect } from "react";
import { Overview } from "../../../components";
import { useAuthStore } from "../../../hooks";
import { useContextStudent } from "../hooks/useStudentUser";

export default function StudentOverviewPage() {
  const { user } = useAuthStore();
  const { overviewData, setUserId } = useContextStudent();

  useEffect(() => {
    if (user === null) return;
    if (user.Students?.student_id === undefined) return;

    console.log(user.Students.student_id);

    setUserId(user.Students.student_id);
  }, []);

  if (overviewData === null) return <p>Loadign...</p>;

  return <Overview overviewData={overviewData} />;
}
