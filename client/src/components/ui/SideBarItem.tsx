import {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";

import { useUiStore } from "../../hooks";
import { useNavigate } from "react-router-dom";

interface SideBarItemProps {
  text: string;
  path: string;
  icon: JSX.Element;
}

export const SideBarItem = ({ text, path, icon }: SideBarItemProps) => {
  const navigate = useNavigate();
  const { handleCloseSideBar } = useUiStore();

  const handleClick = () => {
    navigate(path);
    handleCloseSideBar();
  };

  return (
    <ListItem>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};
