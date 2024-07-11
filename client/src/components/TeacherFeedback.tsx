import { Box } from "@mui/material";

export const TeacherFeedback = () => {
  return (
    <Box textAlign="center">
      <p style={{ fontSize: "3rem", color: "#ABD1C6" }}>Feedback</p>
      <Box
        sx={{
          display: "block",
          textAlign: "left",
          padding: "3vh",
          backgroundColor: "#F9BC60",
          borderRadius: "10px",
          color: "black",
        }}
      >
        <Box>
          <span style={{ fontSize: "1.2rem" }}>
            HERE GOES THE POSITIVE FEEDBACK OF THE TEACHER
          </span>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id quidem
            quisquam, adipisci quod suscipit, perspiciatis eius veniam
            repudiandae laboriosam tenetur maxime cumque nulla deserunt delectus
            odio praesentium sequi laborum ullam!Lorem Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Officia voluptatum, deserunt
            nesciunt a consectetur assumenda earum, atque itaque magni quasi
            iusto dolores doloremque quam maxime minus numquam architecto
            officiis. Tempore.
          </p>
        </Box>
        <Box>
          <p style={{ fontSize: "1.2rem" }}>
            HERE GOES THE CONSTRUCTIVE FEEDBACK OF THE TEACHER
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id quidem
            quisquam, adipisci quod suscipit, perspiciatis eius veniam
            repudiandae laboriosam tenetur maxime cumque nulla deserunt delectus
            odio praesentium sequi laborum ullam!Lorem Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Officia voluptatum, deserunt
            nesciunt a consectetur assumenda earum, atque itaque magni quasi
            iusto dolores doloremque quam maxime minus numquam architecto
            officiis. Tempore.
          </p>
        </Box>
      </Box>
    </Box>
  );
}
