import { useParams } from "react-router-dom";
import { Chat } from "../../../components";

export default function ParentChatPage() {
  const { teacherId } = useParams();

  // TODO manejar exepción

  return (
    <Chat receiverId={teacherId!} />
  );
}
