import { useEffect } from "react";

import { useContextStudent } from "../hooks";
import { useAuthStore } from "../../../hooks";
import { Overview, OverviewSkeleton } from "../../../components";

export default function StudentOverviewPage() {
  const { user } = useAuthStore();
  const { overviewData, setStudentId } = useContextStudent();

  useEffect(() => {
    if (user === null) return;
    if (user.Students?.student_id === undefined) return;

    setStudentId(user.Students.student_id);
  }, []);

  if (overviewData === null) return <OverviewSkeleton />;

  return <Overview overviewData={overviewData} />;
}
