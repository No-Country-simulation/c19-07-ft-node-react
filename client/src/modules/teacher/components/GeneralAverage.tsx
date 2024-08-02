import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useAxiosPrivate } from "../../../hooks";

interface GeneralAverageProps {
  selectedPeriod?: number;
}

const GeneralAverage = ({ selectedPeriod }: GeneralAverageProps) => {
  const api = useAxiosPrivate();
  const { studentId, courseId } = useParams();
  const [average, setAverage] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAverage = async () => {
      try {
        const response = await api.get(
          `/professors/period_marks/${studentId}?courseId=${courseId}&period=${selectedPeriod}`
        );
        const averageValue = response.data.data.average;
        setAverage(averageValue);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      }
    };

    fetchAverage();
  }, [studentId, courseId, selectedPeriod, api]);

  const getMarkColor = (mark: number | null) => {
    if (mark === null) return "black";
    if (mark <= 49) {
      return "red";
    } else if (mark >= 50 && mark <= 80) {
      return "blue";
    } else {
      return "green";
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <Typography
      sx={{
        color: getMarkColor(average),
        textAlign: 'center',
        marginTop: 2,
        fontWeight: 'bold',
      }}
    >
      General average: <strong>{average !== null ? average.toFixed(2) : 'Loading...'}</strong>
    </Typography>
  );
};

export default GeneralAverage;


