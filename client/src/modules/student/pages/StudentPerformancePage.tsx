import { useContextStudent } from "../hooks";
import { Performance } from "../../../components";

export default function StudentPerformancePage() {
  const { overviewData } = useContextStudent();

  if (overviewData === null) return <p>Loading...</p>;

  return (
    <Performance
      evaluations={overviewData.evaluationsByPeriod[0].evaluations}
    />
  );
}
