import { Box } from "@mui/material";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryLegend,
} from "victory";

const studentFakeGrades = [
  { month: "Jan", math: 9.0, science: 4.0 },
  { month: "Feb", math: 3.0, science: 9.0 },
  { month: "Mar", math: 2.0, science: 2.0 },
  { month: "Apr", math: 4.0, science: 6.0 },
  { month: "May", math: 5.0, science: 7.0 },
  { month: "Jun", math: 8.0, science: 9.0 },
];

const ClassRoomChart = () => {
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
        Student report
      </Box>
      <div style={{ width: "100%", height: 400 }}>
        <VictoryChart theme={VictoryTheme.material} width={800} height={400}>
          <VictoryAxis
            tickValues={studentFakeGrades.map((data) => data.month)}
            tickFormat={studentFakeGrades.map((data) => data.month)}
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
            domain={[0, 10]}
            style={{
              tickLabels: {
                fontSize: 15,
                fill: "#0a0a0a",
                padding: 5,
              },
            }}
          />
          <VictoryLine
            data={studentFakeGrades}
            x="month"
            y="math"
            style={{
              data: { stroke: "#f9bc60" },
              labels: {
                fontSize: 12,
                fill: "#f9bc60",
              },
            }}
            labels={({ datum }) => `Math: ${datum.math}`}
            labelComponent={<VictoryTooltip />}
          />
          <VictoryLine
            data={studentFakeGrades}
            x="month"
            y="science"
            style={{
              data: { stroke: "#e16162" },
              labels: {
                fontSize: 12,
                fill: "#e16162",
              },
            }}
            labels={({ datum }) => `Science: ${datum.science}`}
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
              { name: "Math", symbol: { fill: "#f9bc60" } },
              { name: "Science", symbol: { fill: "#e16162" } },
            ]}
          />
        </VictoryChart>
      </div>
    </>
  );
};

export default ClassRoomChart;
