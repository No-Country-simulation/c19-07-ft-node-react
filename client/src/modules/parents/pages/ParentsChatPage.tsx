import { useLocation, useParams } from "react-router-dom";
import { Chat } from "../../../components";

export default function ParentsChatPage() {
  const location = useLocation();
  const { teacherId } = useParams();

  const receiver = {
    id: teacherId!,
    name: location.state.teacherName,
    email: location.state.teacherEmail,
  };

  return <Chat receiver={receiver} />;
}
