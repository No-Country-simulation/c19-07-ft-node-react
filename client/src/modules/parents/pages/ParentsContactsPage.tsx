import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAxiosPrivate } from "../../../hooks";
import { ContactsTable } from "../../../components";

export default function ParentsContactsPage() {
  const api = useAxiosPrivate();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [professors, setProfessors] = useState<any[]>([]);

  const handleClickRow = (row: any) => {
    navigate(`/parents/chat/${row.user_id}`, {
      state: {
        teacherName: row.name,
        teacherEmail: row.email,
      },
    });
  };

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const resp = await api.get("/professors");
        if (resp.status === 200) {
          setProfessors(resp.data);
          setIsLoading(false);
          return;
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchProfessors();
  }, []);

  return (
    <ContactsTable
      heading="Teachers"
      rows={professors}
      isLoading={isLoading}
      onClickRow={handleClickRow}
    />
  );
}
