import { Close, AutoGraph, People } from "@mui/icons-material";
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

import { useUiStore } from "../../hooks";

const drawerWidth = 300;
const drawerBackgroundColor = "#abd1c6";

// const parentOptions = [];

const studentOptions = [
  {
    text: "Performance",
    path: "/parent",
    icon: <AutoGraph></AutoGraph>,
  },
  {
    text: "Classmates",
    path: "/parent/classmates",
    icon: <People></People>,
  },
];

// const professorOptions = [];

export const SideBar = () => {
  const { isSideBarOpen, handleCloseSideBar } = useUiStore();

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
          Teacher / Student
        </Typography>
      </Box>

      <Divider />

      <List>
        {studentOptions.map(({ text, path, icon }) => (
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
