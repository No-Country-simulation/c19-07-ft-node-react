import { useContextParent } from "../hooks";
import { Overview, OverviewSkeleton } from "../../../components";

export default function ParentsOverviewPage() {
  const { overviewData } = useContextParent();

  if (overviewData === null) return <OverviewSkeleton parentView />;

  return <Overview parentView overviewData={overviewData} />;
}
