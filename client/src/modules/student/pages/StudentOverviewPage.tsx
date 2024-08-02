import { useContextStudent } from "../hooks";
import { Overview, OverviewSkeleton } from "../../../components";

export default function StudentOverviewPage() {
  const { overviewData } = useContextStudent();

  if (overviewData === null) return <OverviewSkeleton />;

  return <Overview overviewData={overviewData} />;
}
