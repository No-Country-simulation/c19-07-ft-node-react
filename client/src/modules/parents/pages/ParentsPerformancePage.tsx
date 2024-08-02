import { useContextParent } from "../hooks";
import { Performance } from "../../../components";

export default function ParentsPerformancePage() {
  const { overviewData } = useContextParent();

  if (overviewData === null) return <p>Loading...</p>;

  return (
    <Performance
      evaluations={overviewData.evaluationsByPeriod[0].evaluations}
    />
  );
}
