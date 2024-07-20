import { useParams } from "react-router-dom";
import { Chat } from "../../../components";

export default function TeacherChatPage() {
  const { parentId } = useParams();

  // TODO manejar exepción

  return <Chat receiverId={parentId!} />;
}
