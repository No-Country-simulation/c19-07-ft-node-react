import React from "react";
import { Box } from "@mui/material";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryLegend,
} from "victory";
import useFetchPeriodMarks from "./UseFetchPeriodMarks";

interface ClassRoomChartProps {
  studentId?: string;
  courseId?: string;
}

const ClassRoomChart: React.FC<ClassRoomChartProps> = () => {
  const { data: studentMarks, loading, error } = useFetchPeriodMarks();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Box
        component="div"
        sx={{
          color: "#f3eeeec7",
          fontSize: "35px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Annual performance for {studentMarks.length > 0 ? studentMarks[0].name : "Course"}
      </Box>
      <div style={{ width: "100%", height: 400 }}>
        <VictoryChart theme={VictoryTheme.material} width={800} height={400}>
          <VictoryAxis
            tickValues={studentMarks.map((data) => data.period)}
            tickFormat={studentMarks.map((data) => `Period ${data.period}`)}
            style={{
              tickLabels: {
                fontSize: 15,
                fill: "#0a0a0a",
                padding: 5,
              },
            }}
          />
          <VictoryAxis
            dependentAxis
            domain={[0, 100]}
            style={{
              tickLabels: {
                fontSize: 15,
                fill: "#0a0a0a",
                padding: 5,
              },
            }}
          />
          <VictoryLine
            data={studentMarks}
            x="period"
            y="average"
            style={{
              data: { stroke: "#f9bc60" },
              labels: {
                fontSize: 12,
                fill: "#f9bc60",
              },
            }}
            labels={({ datum }) => `${datum.name}: ${datum.average}`}
            labelComponent={<VictoryTooltip />}
          />
          <VictoryLegend
            x={125}
            y={10}
            orientation="horizontal"
            gutter={20}
            style={{
              labels: {
                fontSize: 18,
                fill: "#0a0a0a",
              },
            }}
            data={[
              { name: studentMarks.length > 0 ? studentMarks[0].name : "Course", symbol: { fill: "#f9bc60" } },
            ]}
          />
        </VictoryChart>
      </div>
    </>
  );
};

export default ClassRoomChart;
