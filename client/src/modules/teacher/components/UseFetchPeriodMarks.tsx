import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAxiosPrivate } from "../../../hooks";

interface ApiError {
  message: string;
}

interface PeriodMarks {
  period: number;
  average: number;
  name: string;
}

const useFetchPeriodMarks = () => {
  const api = useAxiosPrivate();
  const [data, setData] = useState<PeriodMarks[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);
  const { studentId, courseId } = useParams<{ studentId: string; courseId: string }>();

   console.log("Student ID:", studentId);
   console.log("Course ID:", courseId);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        setLoading(true);
        const periodNumbers = [1, 2, 3];
        const requests = periodNumbers.map(period =>
          api.get(`/professors/period_marks/${studentId}?courseId=${courseId}&period=${period}`)
        );
        const responses = await Promise.all(requests);

        const marksData = responses.map((response, index) => ({
          period: periodNumbers[index],
          average: response.data.data.average,
          name: response.data.data.name
        }));

        // console.log("Fetched Marks Data:", marksData);


        setData(marksData);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError({ message: error.message });
        } else {
          setError({ message: "An unexpected error occurred" });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMarks();
  }, [studentId, courseId]);

  return { data, loading, error };
};

export default useFetchPeriodMarks;
