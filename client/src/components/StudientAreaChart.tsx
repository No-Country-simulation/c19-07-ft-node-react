import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useStudent } from "../modules/studients/hooks/useStudent";
import { useEffect } from "react";


const StudientFakeGrades = [
  {
    month: "May",
    math: 9.0,
    english: 7.5,
    science: 4.0,
    arts: 5.0,
    sports: 9.0,
    history: 7.4,
    chemistry: 2.0,
  },
  {
    month: "June",
    math: 3.0,
    english: 5.5,
    science: 9.0,
    arts: 1.0,
    sports: 8.0,
    history: 8.4,
    chemistry: 5.0,
  },
  {
    month: "July",
    math: 2.0,
    english: 2.5,
    science: 2.0,
    arts: 5.0,
    sports: 9.0,
    history: 6.4,
    chemistry: 8.0,
  },
  {
    month: "Aug",
    math: 4.0,
    english: 7.1,
    science: 6.0,
    arts: 2.0,
    sports: 8.0,
    history: 5.4,
    chemistry: 9.0,
  },
];

export const StudientAreaChart = () => {

  const {
    students
  } = useStudent();

  console.log(students);
  


  return (
    
    <ResponsiveContainer width="95%" height={400}>
      <AreaChart
        data={StudientFakeGrades}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis domain={[0, 10]} ticks={[0]} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="math"
          stackId="1"
          stroke="blue"
          fill="blue"
        />
        <Area
          type="monotone"
          dataKey="english"
          stackId="1"
          stroke="green"
          fill="green"
        />
        <Area
          type="monotone"
          dataKey="science"
          stackId="1"
          stroke="purple"
          fill="purple"
        />
        <Area
          type="monotone"
          dataKey="arts"
          stackId="1"
          stroke="yellow"
          fill="yellow"
        />
        <Area
          type="monotone"
          dataKey="sports"
          stackId="1"
          stroke="red"
          fill="red"
        />
        <Area
          type="monotone"
          dataKey="history"
          stackId="1"
          stroke="brown"
          fill="brown"
        />
        <Area
          type="monotone"
          dataKey="chemistry"
          stackId="1"
          stroke="pink"
          fill="pink"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
