import { useEffect } from "react";

import { useContextParent } from "../hooks";
import { useAuthStore } from "../../../hooks";
import { Overview, OverviewSkeleton } from "../../../components";

export default function ParentsOverviewPage() {
  const { user } = useAuthStore();
  const { overviewData, setParentId } = useContextParent();

  useEffect(() => {
    if (user === null) return;
    if (user.Parents?.parent_id === undefined) return;

    setParentId(user.Parents.parent_id);
  }, []);

  if (overviewData === null) return <OverviewSkeleton parentView />;

  return <Overview parentView overviewData={overviewData} />;
}
