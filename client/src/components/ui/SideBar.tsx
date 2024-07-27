import {
  Close,
  AutoGraph,
  People,
  Chat,
  Campaign,
  School,
  Dashboard,
  Person,
  FamilyRestroom,
  Work,
  Class,
} from "@mui/icons-material";
import {
  Box,
  List,
  Drawer,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";

import { SideBarItem } from "./SideBarItem";

import { useAuthStore, useUiStore } from "../../hooks";

const drawerWidth = 300;
const drawerBackgroundColor = "#abd1c6";

const parentOptions = [
  {
    text: "Performance",
    path: "/parents/performance",
    icon: <AutoGraph></AutoGraph>,
  },
  {
    text: "Classmates",
    path: "/parents/classmates",
    icon: <People></People>,
  },
  {
    text: "Chat",
    path: "parents/contacts",
    icon: <Chat></Chat>,
  },
];

const studentOptions = [
  {
    text: "Performance",
    path: "",
    icon: <AutoGraph></AutoGraph>,
  },
  {
    text: "Announcements",
    path: "",
    icon: <Campaign></Campaign>,
  },
];

const professorOptions = [
  {
    text: "Classes",
    path: "/teacher/class",
    icon: <Class></Class>,
  },
  {
    text: "Chat",
    path: "/teacher/contacts",
    icon: <Chat></Chat>,
  },
];

const adminOptions = [
  {
    text: "Dashboard",
    path: "/",
    icon: <Dashboard></Dashboard>,
  },
  {
    text: "Users",
    path: "/admin",
    icon: <Person></Person>,
  },
  {
    text: "Students",
    path: "",
    icon: <School></School>,
  },
  {
    text: "Parents",
    path: "",
    icon: <FamilyRestroom></FamilyRestroom>,
  },
  {
    text: "professors",
    path: "",
    icon: <Work></Work>,
  },
];

export const SideBar = () => {
  const { user } = useAuthStore();
  const { isSideBarOpen, handleCloseSideBar } = useUiStore();

  const { name, type_user } = user!;

  const options =
    type_user === "PARENTS"
      ? parentOptions
      : type_user === "STUDENT"
      ? studentOptions
      : type_user === "PROFESSOR"
      ? professorOptions
      : type_user === "ADMIN"
      ? adminOptions
      : [];

  const drawerContent = (
    <>
      <Box
        display={{ xs: "flex", lg: "none" }}
        justifyContent="end"
        p={{ xs: 1, sm: 1.5 }}
      >
        <Tooltip title="Close">
          <IconButton onClick={handleCloseSideBar}>
            <Close />
          </IconButton>
        </Tooltip>
      </Box>

      <Divider sx={{ display: { lg: "none" } }} />

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
        py={3}
      >
        <Avatar src="" alt="" sx={{ width: "150px", height: "150px" }} />

        <Typography variant="h6" component="div" fontWeight="bold">
          {name}
        </Typography>
      </Box>

      <Divider />

      <List>
        {options.map(({ text, path, icon }) => (
          <SideBarItem key={text} text={text} path={path} icon={icon} />
        ))}
      </List>
    </>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={isSideBarOpen}
        onClose={handleCloseSideBar}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: drawerWidth,
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: drawerBackgroundColor,
            maxWidth: "calc(100vw - 48px)",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        open
        variant="permanent"
        sx={{
          width: drawerWidth,
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: drawerBackgroundColor,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};
