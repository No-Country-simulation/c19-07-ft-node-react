import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAxiosPrivate } from "../../../hooks";
import { ContactsTable } from "../../../components";

export default function TeacherContactsPage() {
  const api = useAxiosPrivate();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [parents, setParents] = useState<any[]>([]);

  const handleClickRow = (row: any) => {
    navigate(`/teacher/chat/${row.user_id}`, {
      state: {
        parentName: row.name,
        parentEmail: row.email,
      },
    });
  };

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const resp = await api.get("/parents");
        if (resp.status === 200) {
          setParents(resp.data);
          setIsLoading(false);
          return;
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchParents();
  }, []);

  return (
    <ContactsTable
      heading="Parents"
      rows={parents}
      isLoading={isLoading}
      onClickRow={handleClickRow}
    />
  );
}
