import { useLocation, useParams } from "react-router-dom";
import { Chat } from "../../../components";

export default function TeacherChatPage() {
  const location = useLocation();
  const { parentId } = useParams();

  const receiver = {
    id: parentId!,
    name: location.state.parentName,
    email: location.state.parentEmail,
  };

  return <Chat receiver={receiver} />;
}
