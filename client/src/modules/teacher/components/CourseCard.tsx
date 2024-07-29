import { Card, CardContent, Typography, CardActionArea } from "@mui/material";

interface CourseCardProps {
  course: {
    cursos_id: string;
    nombre: string;
    descripcion?: string;
  };
  onClick: (courseId: string) => void;
}

const CourseCard = ({ course, onClick }: CourseCardProps) => {
  return (
    <Card
      sx={{
        cursor: "pointer",
        "&:hover": {
          boxShadow: 6,
          backgroundColor: "#e0f7fa",
        },
        border: "1px solid #b2ebf2",
        borderRadius: "8px",
        maxWidth: "300px",
        margin: "auto",
      }}
      elevation={3}
    >
      <CardActionArea onClick={() => onClick(course.cursos_id)}>
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{ textAlign: "center", fontWeight: "bold", marginBottom: "0.5rem" }}
          >
            {course.nombre}
          </Typography>
          {course.descripcion && (
            <Typography
              variant="body2"
              sx={{ textAlign: "center", color: "#555" }}
            >
              {course.descripcion}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CourseCard;
