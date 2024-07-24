import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ButtonArrowBack = () => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };
  return (
    <IconButton
      onClick={handleBackButtonClick}
      sx={{
        color: "black",
        fontWeight: "bold",
        top: "-15px",
        height: "5vh",
        width: "50px",
        borderRadius: "0px",
        "&:hover": {
          backgroundColor: "#f9bc60",
        },
      }}
    >
      <ArrowBack />
    </IconButton>
  );
};
export default ButtonArrowBack;
