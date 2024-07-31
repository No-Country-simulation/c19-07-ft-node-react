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
        transition: "transform 0.3s, box-shadow 0.3s",
        transform: "perspective(1000px)",
        "&:hover": {
          transform: "perspective(1000px) translateZ(40px)",
          boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.486)",
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
